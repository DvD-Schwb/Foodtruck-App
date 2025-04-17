# TypeScript CheatSheet - Persönliche Minidokumentation

## Grundlegende Typen
```typescript
// Primitive Typen: Die Basistypen in TypeScript
let isDone: boolean = false;                  // Wahr oder Falsch
let decimal: number = 6;                      // Ganze Zahlen, Gleitkommazahlen, etc.
let color: string = "blue";                   // Textwerte in Anführungszeichen
let notSure: any = 4;                         // Dynamische Typisierung wie in JavaScript
let u: undefined = undefined;                 // Für nicht zugewiesene Werte
let n: null = null;                           // Für absichtlich leere Werte

// Arrays: Sammlungen von Elementen des gleichen Typs
let list: number[] = [1, 2, 3];               // Standard-Syntax für Arrays
let list2: Array<number> = [1, 2, 3];         // Alternative generische Syntax

// Tupel: Fixe Arrays mit bestimmten Typen an bestimmten Positionen
let x: [string, number] = ["hello", 10];      // Erstes Element ist String, zweites ist Number

// Enum: Benannte Konstantensätze - hilft bei Codelesbarkeit
enum Color {Red, Green, Blue}                 // Automatische Nummerierung (0, 1, 2)
let c: Color = Color.Green;                   // Wert ist 1

// Void: Für Funktionen ohne Rückgabewert
function warnUser(): void { 
  console.log("Warning");                     // Kennzeichnet Funktionen, die nichts zurückgeben
}

// Never: Für Funktionen, die nie normal beendet werden
function error(): never { 
  throw new Error("Error");                   // Für Funktionen die immer eine Exception werfen
}

// Object: Repräsentiert jeden nicht-primitiven Typ
let obj: object = {};                         // Alles außer number, string, boolean, etc.
```

## Typzuweisung und Assertion
```typescript
// Type Inference (Typinferenz): TS kann Typen aus dem Kontext ableiten
let a = 10;                                   // TypeScript erkennt: number, ohne explizite Angabe

// Type Assertion: Dem Compiler mitteilen, dass du den Typ besser kennst
let someValue: any = "this is a string";
// Zwei gleichwertige Syntaxarten:
let strLength1: number = (<string>someValue).length;    // Winkelklammer-Syntax
let strLength2: number = (someValue as string).length;  // as-Syntax (bevorzugt in JSX/TSX)
```

## Fortgeschrittene Typen
```typescript
// Union Types: Eine Variable kann mehrere Typen haben
let id: string | number;                      // Kann entweder String oder Number sein

// Intersection Types: Kombiniert mehrere Typen zu einem
interface BusinessPartner { name: string; credit: number; }
interface Identity { id: number; name: string; }
type Employee = BusinessPartner & Identity;   // Hat alle Eigenschaften beider Interfaces

// Type Aliases: Eigene Namen für komplexe Typen
type Point = { x: number; y: number; };       // Einfacher zu verweisen als komplexe Strukturen

// Literal Types: Spezifische Werte als Typen
type Direction = "North" | "East" | "South" | "West";  // Nur diese 4 Werte sind erlaubt
let dir: Direction = "North";                 // Muss einer der definierten Werte sein

// Nullable Types: Mit strictNullChecks um null-Fehler zu vermeiden
let s: string | null = null;                  // Explizit angeben, dass null erlaubt ist

// Non-nullable Assertion: Sagt TS, dass ein Wert definitiv nicht null ist
function getLength(s: string | null) {
  return s!.length;                           // '!' versichert TS, dass s existiert
}
```

## Interfaces und Typen
```typescript
// Interface: Definiert die Struktur von Objekten
interface User {
  readonly id: number;                        // Kann nach Initialisierung nicht geändert werden
  name: string;                               // Erforderliche Eigenschaft
  age?: number;                               // Optionale Eigenschaft mit ?
  [propName: string]: any;                    // Erlaubt zusätzliche Eigenschaften mit beliebigen Namen
}

// Funktionsinterface: Definiert die Signatur einer Funktion
interface SearchFunc {
  (source: string, subString: string): boolean;  // Parameter- und Rückgabetypen
}

// Erweiterung von Interfaces: Vererbung von Eigenschaften
interface Animal { name: string; }
interface Dog extends Animal { 
  breed: string;                              // Dog hat name von Animal und zusätzlich breed
}

// Implementierung in Klassen: Interface als Vertrag für Klassen
class Cat implements Animal {
  name: string;                               // Muss name implementieren, weil in Animal definiert
  constructor(n: string) { this.name = n; }
}
```

## Funktionen
```typescript
// Parameter-Typen und Rückgabetyp: Strenge Typdefinitionen für Funktionen
function add(x: number, y: number): number {
  return x + y;                              // Deklaration, dass die Funktion eine Zahl zurückgibt
}

// Optionale und Default-Parameter
function buildName(firstName: string, lastName?: string): string { 
  // lastName ist optional durch ? gekennzeichnet
  return lastName ? firstName + " " + lastName : firstName;
}

function buildName2(firstName: string, lastName = "Smith"): string { 
  // Default-Wert für lastName, wenn nicht angegeben
  return firstName + " " + lastName;
}

// Rest-Parameter: Variable Anzahl von Argumenten
function buildNames(firstName: string, ...restOfName: string[]): string { 
  // restOfName sammelt alle zusätzlichen Parameter in ein Array
  return firstName + " " + restOfName.join(" ");
}

// Funktionsüberladung: Unterschiedliche Implementierungen für verschiedene Parameter
function padLeft(value: string, padding: string): string;   // Überladungssignatur 1
function padLeft(value: string, padding: number): string;   // Überladungssignatur 2
function padLeft(value: string, padding: any): string {     // Implementierung
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  return padding + value;
}
```

## Klassen
```typescript
class Person {
  // Zugriffsmodifikatoren und Eigenschaften
  private name: string;                    // Nur innerhalb der Klasse zugänglich
  protected age: number;                   // Zugänglich in Klasse und abgeleiteten Klassen
  readonly id: number;                     // Kann nur gelesen, nicht geändert werden
  static count: number = 0;                // Klasseneigenschaft, nicht Instanzeigenschaft

  constructor(name: string, age: number, id: number) {
    this.name = name;                      // Initialisierung der Eigenschaften
    this.age = age;
    this.id = id;
    Person.count++;                        // Erhöht statischen Zähler bei jeder Instanziierung
  }

  // Methode: Funktion innerhalb einer Klasse
  greet(): string {
    return `Hello, my name is ${this.name}`;  // Kann auf Instanzeigenschaften zugreifen
  }

  // Getter/Setter: Kontrollierter Zugriff auf Eigenschaften
  get personName(): string { 
    return this.name;                      // Erlaubt Lesen wie eine Eigenschaft
  }
  
  set personName(newName: string) { 
    this.name = newName;                   // Erlaubt Setzen wie eine Eigenschaft
  }
}

// Vererbung: Erweiterung von Klassen
class Employee extends Person {
  constructor(
    name: string, 
    age: number, 
    id: number, 
    public department: string              // Parameter-Eigenschaft: deklariert und initialisiert
  ) {
    super(name, age, id);                  // Ruft den Konstruktor der Basisklasse auf
  }
}
```

## Generics
```typescript
// Generische Funktion: Typsichere Wiederverwendung für verschiedene Typen
function identity<T>(arg: T): T {
  return arg;                               // Arbeitet mit jedem Typ, behält Typinformation
}
// Aufruf: Mit explizitem Typ
let output1 = identity<string>("myString"); // Typ ist string
// Aufruf: Mit Typinferenz
let output2 = identity(42);                 // Typ ist number

// Generische Klasse: Typsicherheit bei Klasseninstanzen
class GenericBox<T> {
  private content: T;
  constructor(value: T) { this.content = value; }
  getValue(): T { return this.content; }    // Gibt den gespeicherten Wert mit korrektem Typ zurück
}
// Nutzung:
let stringBox = new GenericBox<string>("Hello World");
let numberBox = new GenericBox(42);         // Typinferenz funktioniert auch hier

// Generische Constraints: Einschränkung, was als Typ verwendet werden kann
interface Lengthwise { length: number; }    // Interface definiert eine Anforderung
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);                  // Sicher: T muss length-Eigenschaft haben
  return arg;
}
// Funktioniert mit Strings (haben length)
loggingIdentity("test"); 
// Funktioniert mit Arrays (haben length)
loggingIdentity([1, 2, 3]);  
// Würde nicht funktionieren mit Zahlen (haben keine length)
// loggingIdentity(3); // Fehler!
```

## Utility Types
```typescript
// Nützliche vordefinierte generische Typen in TypeScript

interface Todo { title: string; description: string; }

// Partial<T>: Macht alle Eigenschaften optional
const updateTodo: Partial<Todo> = { 
  description: "Buy milk"       // title ist nicht erforderlich
};

// Readonly<T>: Macht alle Eigenschaften schreibgeschützt
const todo: Readonly<Todo> = { 
  title: "Learn TS", 
  description: "Study"
};
// todo.title = "New Title"; // Fehler: Kann nicht zugewiesen werden

// Pick<T, K>: Wählt bestimmte Eigenschaften aus
type TodoPreview = Pick<Todo, "title">;  // Nur title-Eigenschaft
const titleOnly: TodoPreview = { title: "Clean room" };

// Omit<T, K>: Entfernt bestimmte Eigenschaften
type TodoInfo = Omit<Todo, "description">;  // Alles außer description
const infoOnly: TodoInfo = { title: "Cook dinner" };

// Record<K, T>: Erstellt Typ mit spezifischen Schlüsseln und Werttypen
type PageInfo = Record<string, { url: string }>;  // Objekt mit String-Schlüsseln und Objekt-Werten
const pages: PageInfo = {
  home: { url: "/home" },
  about: { url: "/about" }
};

// ReturnType<T>: Extrahiert den Rückgabetyp einer Funktion
function f() { return { x: 10, y: 3 }; }
type Coord = ReturnType<typeof f>;  // { x: number, y: number }
```

## Async/Await
```typescript
// Moderne Syntax für asynchrone Operationen (Promises)

// Async-Funktion gibt immer ein Promise zurück
async function fetchData(): Promise<any> {
  try {
    // Await pausiert Ausführung bis Promise erfüllt ist
    const response = await fetch('https://api.example.com/data');
    // Das Ergebnis des Promise wird direkt zurückgegeben
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    throw error;  // Fehler weitergeben
  }
}

// Verwendung von async/await in einer Funktion
async function processData() {
  try {
    // Warten auf das Ergebnis von fetchData()
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    // Fehlerbehandlung
    console.error('Fehler bei der Datenverarbeitung:', error);
  }
}
```

## Dekoratoren
```typescript
// Dekoratoren: Metaprogrammierung durch Annotationen
// (experimentelles Feature, in tsconfig.json aktivieren)

// Klassen-Dekorator
function sealed(constructor: Function) {
  // Verhindert Erweiterung der Klasse und Eigenschaften
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Anwendung des Dekorators mit @
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}

// Methoden-Dekorator
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  // Original-Methode speichern
  const originalMethod = descriptor.value;
  
  // Methode überschreiben mit Logger-Funktionalität
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${key} with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  // Methode mit Dekorator
  @log
  add(a: number, b: number) {
    return a + b;
  }
}
```

## TypeScript Konfiguration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es2020",           // Ziel-ECMAScript-Version für kompilierten JS-Code
    "module": "commonjs",         // Modulsystem (commonjs, esm, amd, etc.)
    "strict": true,               // Aktiviert alle strengen Typ-Prüfungen
    "esModuleInterop": true,      // Vereinfacht Imports von CommonJS-Modulen
    "skipLibCheck": true,         // Überspringt Typprüfung von Bibliotheks-Deklarationsdateien
    "forceConsistentCasingInFileNames": true,  // Verhindert Fehler durch Groß-/Kleinschreibung
    
    // Weitere nützliche Optionen:
    "outDir": "./dist",           // Ausgabeverzeichnis für kompilierte Dateien
    "rootDir": "./src",           // Quellverzeichnis
    "declaration": true,          // Generiert .d.ts Dateien
    "sourceMap": true,            // Generiert Sourcemaps für besseres Debugging
    "noImplicitAny": true,        // Verhindert implizite any-Typen
    "experimentalDecorators": true,  // Aktiviert Dekoratoren
    "emitDecoratorMetadata": true    // Zusätzliche Metadaten für Dekoratoren
  },
  "include": [                    // Dateien/Pfade die einbezogen werden sollen
    "src/**/*"
  ],
  "exclude": [                    // Dateien/Pfade die ausgeschlossen werden sollen
    "node_modules",
    "**/*.test.ts"
  ]
}
```

## TypeScript mit React (Häufige Typen)
```typescript
// Funktionskomponente mit Props-Interface
interface GreetingProps {
  name: string;
  count?: number;
  onGreet: (name: string) => void;
}

// Funktionskomponente mit explizitem Rückgabetyp
const Greeting: React.FC<GreetingProps> = ({ name, count = 1, onGreet }) => {
  return (
    <div>
      <h1>
        {Array(count).fill(`Hello, ${name}!`).join(' ')}
      </h1>
      <button onClick={() => onGreet(name)}>Greet</button>
    </div>
  );
};

// useState mit Typen
import { useState } from 'react';

function Counter() {
  // Spezifiziere den Typ direkt im generischen Parameter
  const [count, setCount] = useState<number>(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// useRef mit Typen
import { useRef } from 'react';

function TextInputWithFocus() {
  // Null, weil initial kein Element zugewiesen ist
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    // Zugriff mit optional chaining, da inputRef.current null sein könnte
    inputRef.current?.focus();
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```
