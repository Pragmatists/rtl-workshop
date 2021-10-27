# Czemu RTL



# RTL vs Enzyme


## Typy queries

### getBy...

Zwraca zmatchowanego node'a lub error gdy go nie ma albo matchuje się więcej niż 1 (tutaj getAllBy).
Nie używamy tego jako assercji - asercja dodatkowo w kodzie.

### queryBy...

Zwraca zmatchowanego node'a lub null gdy go nie ma. Error w przypadku gdy jeden niż więcej element.
W zasadzie używany tylko i wyłącznie do sprawdzania że czegos NIE MA!

### findBy...

Zwraca promise'a, który zresolwuje się gdy element zostanie znaleziony lub zrejectuje jak nie znajdzie albo 
znajdzie więcej niż 1 element. Domyślny timeout to 1000ms.  

## Priorytety querowania / Jak querować

Querujemy tak jak byśmy sami konsumowali wizualnie stronę

### getByRole 

Korzysta z accessibility tree i api, wystawiane jest przez silnik (w Chrome "Elements" -> "Accesibility").

Dodatkowe kolejne poziomy querowania:
* getByLabelText - bardzo dobre do formularzy - znajduje na podstawie labelki (pokazac w jaki sposob mozemy konsumowac labelki)
* getByPlaceholderText - placeholder nie powinien zastępować labelki ale jeżeli z jakiegoś powodu
to jest jedyne co mamy to możemy to wykorzystać
* getByText - przydatne poza formami, nie interaktywne elementy (divy, spany, paragraphy)

Dodatkowo poza tym

* getByAltText - jeżeli twój element obsługuje alt (np. img, area, input)
* getByTitle - atrybut wyrażający pomocnicze informacje o danym elemencie (paragraph, link, input)

I na sam koniec:

* getByTestId - na sam koniec jak żaden z powyższych nie działa

### Within

Jeżeli chcemy zawezić poszukiwania elementy do jakiegoś contenera używamy within().

### Asercje

toHaveTextContent, toHaveLength

Używajmy asercji z biblioteki. 2 ważne funkcje:
- ukrywają jakieś internale (np. sposób wyjmowania textu z elementu)
- human readable błedy, bardziej wyraźnie

## Eventy 

### Firing events

Sposób w jaki możemy uruchamiać interakcje z naszym komponentem

fireEvent.method(element) gdzieL
* method - typ interakcji
* element - selekcja na której dokonujemy

### userEvent

Wspomniec

### axios, serwer, findBy, prawidlowe assercje

Findby zwraca promise - przypomnienie. 
Czasami findby pozwala nam wprowadzić komponent w "stan ustalony" ale może to powodować że pozbycie się asercji 
nagle zielony test przerodzi w czerwony (prawie flickerujące testy :D). Ulatwia zapis ale raczej odra

### waitFor, waitForElementToBeRemoved

Tylko assercje tutaj - odpalane wiele razy wiec nie powinno zmieniac stanu.
Staramy się nie umieszczać wielu asercji w waitFor - ciezko analizowac co jest nie tak oraz możemy szybciej 
sfailować (np. jeżeli weryfikujemy).
Usuwanie uzytkownika (waitForElementToBeRemoved).
Pusty waitFor zrobi robotę ale to na pewno nie o to chodzi.

## getByLabelText

arialabeledBy - przykladowy html

## textMatch !!!

precision, normalization

przykladowy html

## debug

screen.debug()

## findBy vs waitFor - jednak nie to samo

Jeżeli element od razu jest to findBy zwróci wartość i nigdy nie wejdzie w prawidlowy stan zaś waitFor w pętli będzie odpalal.
Test na to - TEST !!

## act 

TEST i przykladzik !!
