# Farmix: Leveraged Farming Protocol

## Overview

Farmix is an innovative leveraged farming protocol developed for the TON blockchain. It allows users to maximize their farming yields by using borrowed funds to amplify their positions.

## Core Components

1. Borrow Smart Contract: Manages loans and leverage.
2. Lend Smart Contract: Handles deposits and lender rewards.
3. Liquidation Smart Contract: Responsible for liquidating undercollateralized positions.
4. Algebra Smart Contract: Contains core mathematical functions and configurations.

## Key Functions

### Borrow Contract

- `newBorrow`: Creates a new leveraged loan.
- `createLeverage`: Opens a leveraged position (1.5x - 3x).
- `deleteBorrowNativeToken`: Closes a position with native token.
- `deleteBorrowCustomToken`: Closes a position with custom token.

### Liquidation Contract

- `calculateHFForLeverage`: Calculates the Health Factor for leveraged positions.

### Algebra Contract

- `getMaxLeverageForToken`: Determines the maximum available leverage for a given token and collateral.

## Leverage Usage

Users can open positions with leverage ranging from 1.5x to 3x. The system automatically calculates the maximum available leverage based on loan parameters and current asset price.

## Security

- All leveraged positions are continuously monitored for collateral adequacy.
- If the Health Factor (HF) falls below a certain threshold, the position may be liquidated to protect the protocol and lenders.

## DEX Integration

The protocol is integrated with a decentralized exchange (DEX) in the TON ecosystem for efficient management of leveraged positions.

## Development and Contribution

We welcome community contributions to the Farmix protocol. Please review our contribution guidelines before submitting pull requests.

## License

MIT

## Contact

Telegram: @smilefromthestreets

