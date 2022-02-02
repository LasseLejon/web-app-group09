CREATE TABLE Accounts(
    accountId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(10) NOT NULL,
    password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

CREATE TABLE Scanners(
    scannerId INT AUTO_INCREMENT PRIMARY KEY,
    scannerNumber INT NOT NULL,
    CONSTRAINT scannerNumberUnique UNIQUE (scannerNumber)
);

CREATE TABLE ScannerBorrowSession(
    scannerBorrowSessionId INT AUTO_INCREMENT PRIMARY KEY,
    borrowDate DATETIME NOT NULL,
    returnDate DATETIME,
    accountId INT,
    scannerId INT,
    FOREIGN KEY (scannerId) REFERENCES Scanners(scannerId),
    FOREIGN KEY (accountId) REFERENCES Accounts(accountId)
);