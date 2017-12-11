# 4it445---AMe-6-
Semestrální práce na předmět 4IT445 - AMe

## Setup

### Nahrání repozitáře k sobě na harddisk
1. Vytvoříš si složku a nějak ji pojmenuješ
2. Otevřeš GitBash nebo CMD v této složce a zadáš příkaz

    ```
    git clone https://github.com/adamhemzal/4it445---AMe-6-.git název-složky

    příkaz git - clonuj - z čeho - a kam (tedy název nějaké složky kam to má hodit)
    ```
3. Stáhne se ti náš repozitář

### Zprovoznění Reactu aneb začínáme vyvíjet
1. Vlezeš do složky **backend**
2. Tady vytvoříš složku **backend/tmp** a do ní nahraješ prázdný soubor **restart.txt**
3. V /backend/ vytvoříš soubor **.env** a poprosíš jednoho z nás, abychom ti poslali API Token na Slack a hesla k rootu
4. ve složce **backend** jdi do složky **backend/src/config** a tady vytvoř soubor config.js a vlož do něj následující kód (Heslo ti na vyžádání pošleme)

    ```
    module.exports = {
        "development": {
        "username": "team6",
        "password": "HESLO TI POŠLEME",
        "database": "user_team6",
        "host": "localhost",
        "port": 6000,
        "dialect": "mysql"
        },
        "production": {
        "username": "team6",
        "password": "HESLO TI POŠLEME",
        "database": "user_team6",
        "host": "localhost",
        "port": 6000,
        "dialect": "mysql"
        }
    };
    ```

5. Zadáš příkaz

    ```
    npm install
    ```

6. Tímto se ti nainstalovaly všechny potřebné balíčky pro vývoj
7. Stále jsi v backendu a zadáš příkaz:

    ```
    npm run dev
    ```

8. Takhle spustíš backend server
9. Vlezeš do šložky **frontend**
10. Tady ve složce vytvoříš soubor **.env** a zadáš do něj: 

    ```
    REACT_APP_API_URL=http://localhost:3001
    ```

11. Dále pak ve složce spustíš příkaz (jsi stále v CMD nebo gitBash)

    ```
    npm install
    ```

12. Počkáš než se vše nainstaluje
13. Ve stejné složce pak spustíš příkaz

    ```
    npm start
    ```

14. Spustí se ti webpack a react ve webovém prohlížeči. React pak reaguje na všechny tvoje změny v kódu

### Developerský cyklus
Pokaždé když chceš vyvíjet, tak dodržuj následující postup

1. Vlezeš do své složky, tak aby si viděl složky frontend a backend a spustíš příkaz

    ```
    git pull
    ```

2. Tímto se ti stáhnou poslední commity
3. Začneš psát kód
4. Jsi s kódem spokojený tak zapíšeš změny pomocí příkazů

    ```
    git status - zjistí, co je nového
    git add . - přidá všechno do lobby, co se má commitovat
    git commit -m "Tady je koment k commitu" - tímhle příkazem commitneš a zároven napíšeš message
    git push - tímto příkazem pak odešleš změnu do repozitáře na github
    ```

5. Takhe proces neustále opakuješ

