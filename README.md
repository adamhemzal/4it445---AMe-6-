# 4it445---AMe-6-
Semestrální práce na předmět 4IT445 - AMe

## Updates

### 0.2
- upravil jsem sekci *Zprovoznění Reactu aneb začínáme vyvíjet*

### 0.1
- přidal jsem [axios](https://github.com/axios/axios), pomocí kterého budeme provádět AJAX cally na APIčka

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
3. V /backend/ vytvoříš soubor **.env** a tam nahraješ SLACK API Token, který ti pošle jedn z nás
4. Zadáš příkaz

    ```
    npm start
    ```

5. Vlezeš do šložky **frontend**
6. Tady ve složce spustíš příkaz (jsi stále v CMD nebo gitBash)

    ```
    npm install
    ```

7. Počkáš než s evše nainstaluje
8. Ve stejné složce pak spustíš příkaz

    ```
    npm start
    ```

9. Spustí se ti webpack a react ve webovém prohlížeči. Reaguje na všechny tvoje změny v kódu

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

