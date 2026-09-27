// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HoneyTraceability
 * @dev Immutable blockchain traceability for HiveTrace.
 * Stores only cryptographic hashes of supply chain events to ensure data integrity
 * without exposing private or sensitive information on-chain.
 */
contract HoneyTraceability {
    struct TraceEvent {
        string batchId;
        string eventType;
        string dataHash;
        string previousEventHash;
        uint256 timestamp;
        address recordedBy;
    }

    // Mapping from a data hash to its TraceEvent record
    mapping(string => TraceEvent) public events;
    
    // Mapping from a batchId to an array of data hashes (for fetching history)
    mapping(string => string[]) public batchEvents;

    event BatchEventRecorded(
        string indexed batchId,
        string eventType,
        string dataHash,
        string previousEventHash,
        uint256 timestamp,
        address recordedBy
    );

    /**
     * @dev Records a new supply chain event for a batch.
     * @param _batchId The unique ID of the honey batch or package.
     * @param _eventType Type of the event (e.g., 'HIVE_REGISTERED', 'PACKAGED').
     * @param _dataHash The SHA256/Keccak256 hash of the canonical JSON data.
     * @param _previousEventHash The hash of the previous event (or 'GENESIS' if first).
     */
    function recordBatchEvent(
        string memory _batchId,
        string memory _eventType,
        string memory _dataHash,
        string memory _previousEventHash
    ) public {
        // Ensure the hash hasn't been recorded already
        require(events[_dataHash].timestamp == 0, "Event hash already recorded");

        TraceEvent memory newEvent = TraceEvent({
            batchId: _batchId,
            eventType: _eventType,
            dataHash: _dataHash,
            previousEventHash: _previousEventHash,
            timestamp: block.timestamp,
            recordedBy: msg.sender
        });

        events[_dataHash] = newEvent;
        batchEvents[_batchId].push(_dataHash);

        emit BatchEventRecorded(
            _batchId,
            _eventType,
            _dataHash,
            _previousEventHash,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @dev Verifies if a specific data hash exists on-chain.
     */
    function verifyBatchEvent(string memory _dataHash) public view returns (bool) {
        return events[_dataHash].timestamp != 0;
    }

    /**
     * @dev Retrieves all event hashes associated with a batch.
     */
    function getBatchEvents(string memory _batchId) public view returns (string[] memory) {
        return batchEvents[_batchId];
    }
}
