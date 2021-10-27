# Czemu RTL

## Problem ktory chcemy rozwiazac

Chcemy napisac utrzymywalne testy, które dają wysoką pewność tego, że nasze komponenty działają dla użytkownika.
Chcemy uciekać od szczegółów implementacyjnych. Chcemy być pewni, że refaktor wnętrza komponentów nie doprowadzi do wybuchu
naszych testów. 
Trochę brzmi jak blackboxowe testy i w zasadzie się to zgadza. (Porównanie do testów backendowych)

Założenia biblioteki są takie żeby testy powstawały w zasadzie tak w jaki sposób użytkownik posługuje się 
i weryfikuje prawidłowość działania komponentów na stronie. Stąd w centrum RTL stoi bardzo rozbudowane sposób querowania
drzewa DOM.

TEchnicznie jest to biblioteka, w której sercu jest DOM Testing Library a w przypadku reacta jest zbudowana na
react-dom oraz react-dom/test-utils.

Istnieją inne implementacje TEsting Library dla chociażby Vue czy Angulara. W zasadzie kod testowy, który napiszemy 
byłby 1 do 1 przenaszalny jeżeli nagle pod spodem byśmy wymienili framework który testujemy (oczywiście oprócz metod
stricte związany z wyrenderowaniem komponentu).

# RTL vs Enzyme

Główne różnice:

* filozofia testowania - enzyme pozwala na testowanie internali (stan, propsy) i niektórzy namawiają do takiego testowania 
podczas gdy rtl uniemożliwia taką formę testowania. Jak już wspomnieliśmy RTL stara się być tak jak użytkownik
  
* shollow vs deep rendering - możliwe w enyzmie ze względu na filozofię, w RTL niemożliwe

* enzyme pozwala testować internals ale też pozwala operować na DOM. RTL tylko DOM i skupienei się na tej filozofii 
powoduje że querowanie jest rozbudowane i stoi za nim pewien koncept.
  
* setup - wydaje sie prostszy w RTL

* czytelność testów - ocenimy to ;-)

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
nagle zielony test przerodzi w czerwony (prawie flickerujące testy :D). Ulatwia zapis ale powinno byc uzywane z 
pelna swiadomoscia.

### waitFor, waitForElementToBeRemoved

Tylko assercje tutaj - odpalane wiele razy wiec nie powinno zmieniac stanu.
Staramy się nie umieszczać wielu asercji w waitFor gdyż wielokrotnie sprawdzamy to samo co już jest spełnione.
Usuwanie uzytkownika (waitForElementToBeRemoved).
Pusty waitFor zrobi robotę ale to na pewno nie o to chodzi (przyklad).

## getByLabelText

ArialabeledBy na tabelce oraz na inpucie

## textMatch !!!

precision, normalization

## debug

screen.debug(), window.document

## findBy vs waitFor - jednak nie to samo

Jeżeli element od razu jest to findBy zwróci wartość i nigdy nie wejdzie w prawidlowy stan zaś waitFor w pętli będzie odpalal.
Test na to - TEST !!

## act 

wspomniec