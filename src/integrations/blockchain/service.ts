import { ethers } from 'ethers';
import { supabaseAdmin } from '../supabase/client.server';

// Minimal ABI for the HoneyTraceability contract
const contractABI = [
  "function recordBatchEvent(string _batchId, string _eventType, string _dataHash, string _previousEventHash) public",
  "function verifyBatchEvent(string _dataHash) public view returns (bool)",
  "function getBatchEvents(string _batchId) public view returns (string[])",
  "event BatchEventRecorded(string indexed batchId, string eventType, string dataHash, string previousEventHash, uint256 timestamp, address recordedBy)"
];

export class BlockchainService {
  private provider: ethers.JsonRpcProvider | null = null;
  private wallet: ethers.Wallet | null = null;
  private contract: ethers.Contract | null = null;
  public isDemoMode: boolean = false;

  constructor() {
    const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;
    const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
    const contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS;

    if (!rpcUrl || !privateKey || !contractAddress) {
      console.warn('[BlockchainService] Missing blockchain credentials. Operating in DEMO MODE.');
      this.isDemoMode = true;
      return;
    }

    try {
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      this.wallet = new ethers.Wallet(privateKey, this.provider);
      this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet);
    } catch (error) {
      console.error('[BlockchainService] Failed to initialize blockchain:', error);
      this.isDemoMode = true;
    }
  }

  /**
   * Generates a canonical SHA256 hash for the data
   */
  public generateHash(data: any): string {
    const canonicalStr = JSON.stringify(data, Object.keys(data).sort());
    return ethers.sha256(ethers.toUtf8Bytes(canonicalStr));
  }

  /**
   * Records a traceability event on the blockchain (or mock it in demo mode)
   */
  public async recordEvent(
    batchId: string,
    eventType: string,
    data: any,
    previousEventHash: string = 'GENESIS',
    recordId: string
  ): Promise<{ txHash: string; hash: string }> {
    const dataHash = this.generateHash(data);

    if (this.isDemoMode || !this.contract) {
      console.log(`[Demo] Recorded event for batch ${batchId}. Hash: ${dataHash}`);
      const mockTxHash = `0xmock${Math.random().toString(16).slice(2)}`;
      
      // Store transaction in DB
      await supabaseAdmin.from('blockchain_transactions').insert({
        record_id: recordId,
        tx_hash: mockTxHash,
        network: 'DEMO',
        status: 'confirmed',
        timestamp: new Date().toISOString()
      });

      return { txHash: mockTxHash, hash: dataHash };
    }

    try {
      const tx = await this.contract.recordBatchEvent(batchId, eventType, dataHash, previousEventHash);
      
      // Store transaction in DB as pending
      await supabaseAdmin.from('blockchain_transactions').insert({
        record_id: recordId,
        tx_hash: tx.hash,
        network: 'EVM',
        status: 'pending',
        timestamp: new Date().toISOString()
      });

      // Wait for confirmation
      const receipt = await tx.wait();
      
      // Update DB to confirmed
      await supabaseAdmin.from('blockchain_transactions').update({
        status: 'confirmed'
      }).eq('tx_hash', tx.hash);

      return { txHash: tx.hash, hash: dataHash };
    } catch (error: any) {
      console.error('[BlockchainService] Transaction failed:', error);
      throw new Error(`Blockchain transaction failed: ${error.message}`);
    }
  }
}

export const blockchainService = new BlockchainService();
