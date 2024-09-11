https://fullstackopen.com/en/part0/fundamentals_of_web_apps#exercises-0-1-0-6
<h1>0.4: New note diagram</h1>

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    note right of Browser: Browser sends the inputted note to Server
    note left of Server: Server updates notes
    Server-->>Browser: Redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate Server

    
    
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: notes(.html)
    deactivate Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: main.css
    deactivate Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server-->>Browser: main.js
    deactivate Server
    note right of Browser: Browser executes main.js which requests data.json from Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: data.json
    deactivate Server
    note right of Browser: Browser executes the event handler (as defined in main.js) that renders the notes stored in data.json
```

<h1>0.5: Single page app diagram</h1>

```mermaid
    sequenceDiagram
    participant Browser
    participant Server
    
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server-->>Browser: spa(.html)
    deactivate Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: main.css
    deactivate Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate Server
    Server-->>Browser: spa.js
    deactivate Server
    note right of Browser: Browser executes spa.js which requests data.json from Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: data.json
    deactivate Server
    note right of Browser: Browser executes the event handler (as defined in main.js) that renders the notes stored in data.json
```

<h1>0.6: New note in Single page app diagram</h1>

```mermaid
    sequenceDiagram
    participant Browser
    participant Server

    note right of Browser: Browser re-renders the notes currently on the page, as well as rendering the inputted note
        
    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    note right of Browser: Browser sends the inputted note to Server
    note left of Server: Server updates notes
    Server-->>Browser: HTTP status code: 201 Created (i.e., the request succeeded, creating a new resource as a result)
    deactivate Server    
```
