# Czemu RTL



# RTL vs Enzyme

# Przykładowe testy


## Typy queries

### getBy...

Zwraca zmatchowanego node'a lub error gdy go nie ma albo matchuje się więcej niż 1 (tutaj getAllBy)

### queryBy...

Zwraca zmatchowanego node'a lub null gdy go nie ma. Error w przypadku gdy jeden niż więcej element.

### findBy...

Zwraca promise'a, który zresolwuje się gdy element zostanie znaleziony lub zrejectuje jak nie znajdzie albo 
znajdzie więcej niż 1 element. Domyślny timeout to 1000ms.  

## Priorytety querowania / Jak querować

Querujemy tak jak byśmy sami konsumowali wizualnie stronę

### getByRole 

Korzysta z accessibility tree i api, wystawiane jest przez silnik (w Chrome "Elements" -> "Accesibility").

### Within

within().

### Asercje

toHaveTextContent, toHaveLength

## Eventy 

### Firing events

fireEvent.method(element)

### axios, serwer, findBy, prawidlowe assercje

Findby zwraca promise, korelacja pomiedzy findby a getby i flickerujące testy.

### waitFor, waitForElementToBeRemoved

Staramy się nie umieszczać wielu asercji w waitFor - ciezko analizowac co jest nie tak. 
Usuwanie uzytkownika (waitForElementToBeRemoved).

