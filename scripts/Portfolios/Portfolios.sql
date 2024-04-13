-- Portfolio 샘플 데이터 생성
-- (1) DB 생성
use PortfolioDB
-- (2) Collection 생성 & Document 삽입
db.Portfolio.insertMany(
    [
        { 
            "NAME": "My Portfolio",
            "TYPE": "Current",
            "ASSETS": {"GOOGL": 8900, "AAPL": 2353, "MSFT": 5323, "KO": 1890}
        },
        { 
            "NAME": "PORT_ONE",
            "TYPE": "Customized",
            "ASSETS": {"AAPL": 13, "MSFT": 17, "AMD": 8}
        },
        { 
            "NAME": "PORT_TWO",
            "TYPE": "Customized",
            "ASSETS": {"META": 25, "GOOGL": 8,  "BA": 20, "TSLA": 2,  "KO": 16}
        },
        { 
            "NAME": "PORT_THREE",
            "TYPE": "Customized",
            "ASSETS": {"ADBE": 10, "AAPL": 3,  "MSFT": 7,  "NVDA": 5}
        },
        { 
            "NAME": "PORT_FOUR",
            "TYPE": "Customized",
            "ASSETS": {"GOOGL": 18, "AAPL": 2,  "PEP": 32, "XOM": 15,  "KO": 24}
        },
        { 
            "NAME": "PORT_FIVE",
            "TYPE": "Customized",
            "ASSETS": {"GOOGL": 52, "AAPL": 31, "MSFT": 71}
        },
        { 
            "NAME": "PORT_SIX",
            "TYPE": "Customized",
            "ASSETS": {"MCD": 12, "AAPL": 17, "MSFT": 12, "KO": 45, "CVX": 13, "GOOGL": 23}
        },
        { 
            "NAME": "PORT_SEVEN",
            "TYPE": "Customized",
            "ASSETS": {"JPM": 9,  "JNJ": 19}
        }
    ]
)