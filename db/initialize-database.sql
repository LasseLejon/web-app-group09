CREATE TABLE Accounts(
    accountId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(10) NOT NULL,
    password VARCHAR(300) NOT NULL,
    isAdmin VARCHAR(10) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

CREATE TABLE Scanners(
    scannerId INT PRIMARY KEY,
    scannerInUse BOOLEAN DEFAULT false
);

CREATE TABLE ScannerBorrowSession(
    scannerBorrowSessionId INT AUTO_INCREMENT PRIMARY KEY,
    borrowDate DATETIME NOT NULL,
    returnDate DATETIME,
    accountId INT NOT NULL,
    scannerId INT NOT NULL, 
    FOREIGN KEY (scannerId) REFERENCES Scanners(scannerId)
    ON UPDATE CASCADE,
    FOREIGN KEY (accountId) REFERENCES Accounts(accountId)
);

INSERT INTO Accounts (username, password, isAdmin) VALUES ('admin', '$2a$10$f/.KuLqLZJTpuBPYq1u2i.tuzrNBxooPrKXkWGeIMhaoCO2C0aQhi', 'yes')