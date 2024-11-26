import { FormEvent, useState, useEffect } from "react"
import { Header } from "../../Components/Header"
import { Input } from "../../Components/input"

import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from "firebase/firestore";

interface LinksProps {
  id: string;
  nome: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nomeInput, setNomeIntup] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [texColorInput, setTextColorInput] = useState("#f1f1f1");
  const [background, setBackground] = useState("#121212")
  const [links, setLinks] = useState<LinksProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinksProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          nome: doc.data().nome,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })
      setLinks(lista)
    })
    return () => {
      unsub();
    }
  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (nomeInput === "" || urlInput === "") {
      alert("Preecha todos os campos")
      return;
    }
    addDoc(collection(db, "links"), {
      nome: nomeInput,
      url: urlInput,
      bg: background,
      color: texColorInput,
      created: new Date()
    })
      .then(() => {
        setNomeIntup("");
        setUrlInput("");
        console.log("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("Error ao cadastrar no banco de dados " + error)
      })
  }

  async function handleDeleteLink(id: string) {

    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)

  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o Nome do Link"
          value={nomeInput}
          onChange={(e) => setNomeIntup(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
        <Input
          type="url"
          placeholder="Digite a Url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
            <input
              type="color"
              value={texColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            />

          </div>
        </section>

        {nomeInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">Veja como ta Ficando</label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-betweenbg bg-zinc-900 rounded px-1 py-3"
              style={{ marginBottom: 8, marginTop: 8, backgroundColor: background }}
            >
              <p className="font-medium" style={{ color: texColorInput }}>{nomeInput}</p>
            </article>
          </div>
        )}

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
          Cadastrar
        </button>
      </form>
      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus Links
      </h2>


      {links.map((link) => (
        <article key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ background: link.bg, color: link.color }}
        >
          <p>{link.nome}</p>
          <div>
            <button onClick={() => handleDeleteLink(link.id)}
              className="border border-dashed p-1 rounded bg-neutral-900"
            >
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))
      }


    </div >
  )
}