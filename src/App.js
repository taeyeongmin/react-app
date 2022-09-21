import './App.css';
import {useEffect, useState} from 'react';

function Header(props) {

  return (
      <header className="App-header">
          <h2 onClick={e=>{
              props.onChange();
          }}>react {props.title}</h2>
      </header>
  );
}

function Nav(props) {
    // props.onChange();
    const lis = []
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}><a id={t.id} href={"/read/" + t.id} onClick={e => {
            e.preventDefault();
            props.onChange(e.target.id);
        }}>{t.title}</a></li>)
    }

    return (<nav className='App-nav'>
        <ol>
            {lis}
        </ol>
    </nav>);
}

function Article(props) {
    return (<article className='App-article'>
            <h1>{props.title}</h1>
            <p>{props.body}</p>
    </article>
    );
}

function Create(props) {

    return (
        <article className='App-input-area'>

        </article>
    );
}

function Result() {

    const [list, setList] = useState([]);

    const result = fetch("http://localhost:8080/sims-api/user/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-TOKEN": "aaa"
        }
    })
        .then((response) => response.json())
        .then((response)=>{
            for(let i = 0; i < response.length; i++){
                console.log(response);
            }
        });

    return(<h2></h2>)
}

function App() {

    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);

    const [topics, setTopics] = useState([
        {id: 1, title: "html", body: 'html is ...'},
        {id: 2, title: "css", body: 'css is ...'},
        {id: 3, title: "js", body: 'js is ...'},
    ]);

    console.log('mode = ', mode);

    let content = null;
    if (mode === 'WELCOME') {
        content = <Article title="Welcome" body="Hello, react"></Article>
    }else if (mode === 'READ') {
        for(let i = 0; i < topics.length; i++){
           if(id == topics[i].id){
               content = <Article title={topics[i].title} body={topics[i].body}></Article>
           }
        }
    }else if(mode === 'CREATE'){
        content = <Create onCreate={(title, body)=>{
            const newTopics = [...topics];
            const newTopic = {id:nextId,title:title,body:body};
            newTopics.push(newTopic);
            setTopics(newTopics);

            setId(nextId);
            setNextId(nextId+1);

            setMode('READ');
        }}></Create>
    }

    return (
        <div className="App">
            <Header title="WEB" onChange={() => {
                setMode('WELCOME');
            }}></Header>
            <Nav topics={topics} onChange={(_id) => {
                setMode('READ');
                setId(_id);
            }}></Nav>
            {content}
            <div className="create-container"><a href="/create" onClick={(e)=>{
                e.preventDefault();
                setMode('CREATE');
            }}>Create</a></div>
           <Result></Result>
        </div>
    );
}

export default App;
