# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "The Pledge" - a Web3 DeFi application built with React 18 + TypeScript + Vite for cryptocurrency token pledging. The application integrates with Ethereum blockchain, supports multiple wallets, and provides comprehensive pledge management and analytics.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Linting with auto-fix
npm run lint

# Code formatting
npm run format

# Preview built application
npm run preview
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite 6.0.1
- **Web3:** Wagmi 2.13.3, Ethers 6.13.4, Viem 2.21.53
- **Wallets:** MetaMask, Coinbase Wallet, WalletConnect
- **Database:** Supabase
- **State:** React Query, React Context
- **Styling:** CSS Modules
- **Charts:** React Chart.js 2, Recharts

## Architecture

The application follows a provider-based architecture with clear separation of concerns:

### Directory Structure
- `src/components/` - Reusable UI components organized by feature
- `src/pages/` - Route components (home, pledge, dashboard)
- `src/context/` - React Context providers for state management
- `src/services/` - API services (Supabase, GraphQL)
- `src/web3/` - Blockchain configuration and utilities
- `src/helpers/` - Utility functions
- `src/interface/` - TypeScript interfaces

### Key Patterns
- **Provider Pattern:** `AppProviders.tsx` wraps the app with all necessary context providers
- **Service Layer:** `PledgersService.ts` handles data fetching from multiple sources
- **Component Composition:** Pages composed of section components
- **Custom Hooks:** Web3 interactions abstracted into reusable hooks

## Web3 Configuration

### Networks
- **Mainnet:** `0x910812c44ed2a3b611e4b051d9d83a88d652e2dd`
- **Sepolia:** `0x37538D1201486e11f5A06779168a30bA9D683a12`

### Data Sources
1. **Supabase:** User profiles, pledge status, metadata
2. **GraphQL (The Graph):** Blockchain data aggregation
   - **Pledger Counts:** Historical count of active pledgers
   - **Total Pledged:** Historical total pledged amounts in Wei (displayed as millions of PLEDGE tokens)
3. **Smart Contract:** Direct blockchain interactions

## Main Application Flow

1. **Home (`/`):** Landing page with pledgers list, FAQ, tokenomics
2. **Pledge (`/your-pledge`):** User-specific pledge management
3. **Dashboard (`/dashboard`):** Analytics and charts

## Key Entry Points

- **App Root:** `src/main.tsx`
- **App Component:** `src/App.tsx`
- **Providers:** `src/context/AppProviders.tsx`
- **Web3 Config:** `src/web3/config.ts`
- **Core Types:** `src/interface/Pledger.ts`

## Development Notes

- ESLint allows `@ts-ignore` and `any` types for flexibility
- TypeScript config uses composite project structure
- CSS Modules provide scoped component styling
- React Query handles async state management
- Multiple wallet providers support various connection methods