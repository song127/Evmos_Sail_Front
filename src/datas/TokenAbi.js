export const TokenAbi = [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "spender", "type": "address"}, {"name": "tokens", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {
        "name": "tokens",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "amount", "type": "uint256"}],
    "name": "withdrawEther",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "_totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "tokenOwner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "a", "type": "uint256"}, {"name": "b", "type": "uint256"}],
    "name": "safeSub",
    "outputs": [{"name": "c", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "to", "type": "address"}, {"name": "tokens", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "a", "type": "uint256"}, {"name": "b", "type": "uint256"}],
    "name": "safeDiv",
    "outputs": [{"name": "c", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "spender", "type": "address"}, {"name": "tokens", "type": "uint256"}, {
        "name": "data",
        "type": "bytes"
    }],
    "name": "approveAndCall",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "a", "type": "uint256"}, {"name": "b", "type": "uint256"}],
    "name": "safeMul",
    "outputs": [{"name": "c", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "newOwner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "tokenAddress", "type": "address"}, {"name": "tokens", "type": "uint256"}],
    "name": "transferAnyERC20Token",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "tokenOwner", "type": "address"}, {"name": "spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "remaining", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "a", "type": "uint256"}, {"name": "b", "type": "uint256"}],
    "name": "safeAdd",
    "outputs": [{"name": "c", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
        "indexed": true,
        "name": "_to",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
        "indexed": true,
        "name": "to",
        "type": "address"
    }, {"indexed": false, "name": "tokens", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "tokenOwner", "type": "address"}, {
        "indexed": true,
        "name": "spender",
        "type": "address"
    }, {"indexed": false, "name": "tokens", "type": "uint256"}],
    "name": "Approval",
    "type": "event"
}, {
    "constant": true,
    "inputs": [{"name": "tokenOwner", "type": "address"}, {"name": "spender", "type": "address"}],
    "name": "borrowAllowance",
    "outputs": [{"name": "remaining", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},];

export const AavePoolAbi = [{
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "onBehalfOf", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "borrowRateMode", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "borrowRate",
        "type": "uint256"
    }, {"indexed": true, "internalType": "uint16", "name": "referral", "type": "uint16"}],
    "name": "Borrow",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "onBehalfOf", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"indexed": true, "internalType": "uint16", "name": "referral", "type": "uint16"}],
    "name": "Deposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "target", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "initiator",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "asset", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "premium", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
    }],
    "name": "FlashLoan",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "collateralAsset",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "debtAsset", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "debtToCover", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "liquidatedCollateralAmount",
        "type": "uint256"
    }, {"indexed": false, "internalType": "address", "name": "liquidator", "type": "address"}, {
        "indexed": false,
        "internalType": "bool",
        "name": "receiveAToken",
        "type": "bool"
    }],
    "name": "LiquidationCall",
    "type": "event"
}, {"anonymous": false, "inputs": [], "name": "Paused", "type": "event"}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "RebalanceStableBorrowRate",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "repayer", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Repay",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "liquidityRate",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "variableBorrowRate",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "liquidityIndex", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "variableBorrowIndex",
        "type": "uint256"
    }],
    "name": "ReserveDataUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "ReserveUsedAsCollateralDisabled",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "ReserveUsedAsCollateralEnabled",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "rateMode", "type": "uint256"}],
    "name": "Swap",
    "type": "event"
}, {"anonymous": false, "inputs": [], "name": "Unpaused", "type": "event"}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "reserve", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "to", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Withdraw",
    "type": "event"
}, {
    "inputs": [],
    "name": "FLASHLOAN_PREMIUM_TOTAL",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "LENDINGPOOL_REVISION",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "MAX_NUMBER_RESERVES",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "MAX_STABLE_RATE_BORROW_SIZE_PERCENT",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "interestRateMode", "type": "uint256"}, {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
    }, {"internalType": "address", "name": "onBehalfOf", "type": "address"}],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"internalType": "address", "name": "onBehalfOf", "type": "address"}, {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
    }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {"internalType": "address", "name": "to", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "balanceFromBefore", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "balanceToBefore",
        "type": "uint256"
    }], "name": "finalizeTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "receiverAddress", "type": "address"}, {
        "internalType": "address[]",
        "name": "assets",
        "type": "address[]"
    }, {"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}, {
        "internalType": "uint256[]",
        "name": "modes",
        "type": "uint256[]"
    }, {"internalType": "address", "name": "onBehalfOf", "type": "address"}, {
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
    }, {"internalType": "uint16", "name": "referralCode", "type": "uint16"}],
    "name": "flashLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "getAddressesProvider",
    "outputs": [{"internalType": "contract ILendingPoolAddressesProvider", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}],
    "name": "getConfiguration",
    "outputs": [{
        "components": [{"internalType": "uint256", "name": "data", "type": "uint256"}],
        "internalType": "struct DataTypes.ReserveConfigurationMap",
        "name": "",
        "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}], "name": "getReserveData", "outputs": [{
        "components": [{
            "components": [{"internalType": "uint256", "name": "data", "type": "uint256"}],
            "internalType": "struct DataTypes.ReserveConfigurationMap",
            "name": "configuration",
            "type": "tuple"
        }, {"internalType": "uint128", "name": "liquidityIndex", "type": "uint128"}, {
            "internalType": "uint128",
            "name": "variableBorrowIndex",
            "type": "uint128"
        }, {"internalType": "uint128", "name": "currentLiquidityRate", "type": "uint128"}, {
            "internalType": "uint128",
            "name": "currentVariableBorrowRate",
            "type": "uint128"
        }, {"internalType": "uint128", "name": "currentStableBorrowRate", "type": "uint128"}, {
            "internalType": "uint40",
            "name": "lastUpdateTimestamp",
            "type": "uint40"
        }, {"internalType": "address", "name": "aTokenAddress", "type": "address"}, {
            "internalType": "address",
            "name": "stableDebtTokenAddress",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "variableDebtTokenAddress",
            "type": "address"
        }, {
            "internalType": "address",
            "name": "interestRateStrategyAddress",
            "type": "address"
        }, {"internalType": "uint8", "name": "id", "type": "uint8"}],
        "internalType": "struct DataTypes.ReserveData",
        "name": "",
        "type": "tuple"
    }], "stateMutability": "view", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}],
    "name": "getReserveNormalizedIncome",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}],
    "name": "getReserveNormalizedVariableDebt",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getReservesList",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserAccountData",
    "outputs": [{
        "internalType": "uint256",
        "name": "totalCollateralETH",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "totalDebtETH", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "availableBorrowsETH",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "currentLiquidationThreshold",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "ltv", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "healthFactor",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserConfiguration",
    "outputs": [{
        "components": [{"internalType": "uint256", "name": "data", "type": "uint256"}],
        "internalType": "struct DataTypes.UserConfigurationMap",
        "name": "",
        "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "address",
        "name": "aTokenAddress",
        "type": "address"
    }, {"internalType": "address", "name": "stableDebtAddress", "type": "address"}, {
        "internalType": "address",
        "name": "variableDebtAddress",
        "type": "address"
    }, {"internalType": "address", "name": "interestRateStrategyAddress", "type": "address"}],
    "name": "initReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "contract ILendingPoolAddressesProvider", "name": "provider", "type": "address"}],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "collateralAsset", "type": "address"}, {
        "internalType": "address",
        "name": "debtAsset",
        "type": "address"
    }, {"internalType": "address", "name": "user", "type": "address"}, {
        "internalType": "uint256",
        "name": "debtToCover",
        "type": "uint256"
    }, {"internalType": "bool", "name": "receiveAToken", "type": "bool"}],
    "name": "liquidationCall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "paused",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "address",
        "name": "user",
        "type": "address"
    }], "name": "rebalanceStableBorrowRate", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "rateMode", "type": "uint256"}, {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
    }],
    "name": "repay",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "uint256",
        "name": "configuration",
        "type": "uint256"
    }], "name": "setConfiguration", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "bool", "name": "val", "type": "bool"}],
    "name": "setPause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "address",
        "name": "rateStrategyAddress",
        "type": "address"
    }],
    "name": "setReserveInterestRateStrategyAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "bool",
        "name": "useAsCollateral",
        "type": "bool"
    }], "name": "setUserUseReserveAsCollateral", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "uint256",
        "name": "rateMode",
        "type": "uint256"
    }], "name": "swapBorrowRateMode", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "asset", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"internalType": "address", "name": "to", "type": "address"}],
    "name": "withdraw",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}];
