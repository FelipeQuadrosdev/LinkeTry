import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../Components/input"
import { auth } from "../../services/firebaseConnection"
import { createUserWithEmailAndPassword } from "firebase/auth"

export function Cadastro() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    function validarSenha(password:string):string| undefined{
        if (password.length < 6) { return "A senha deve ter pelo menos 6 caracteres."; }
    }

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Preencha todos os Campos Corretamente!!")
            return;
        }

        const senhaErro = validarSenha(password);
        if (senhaErro) {
            setError(senhaErro);
            return;

        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Cadastrado com Sucesso")
                navigate("/login")
            })
            .catch((error) => {
                console.log("Error ao Cadastrar" + error)
            })
    }


    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Cada
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">stre-se</span>
                </h1>
            </Link>
            <form onSubmit={handleRegister} className="w-full max-w-xl flex flex-col px-2">
                <Input
                    placeholder="Digite o seu email..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    placeholder="********"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">
                    Cadastrar
                </button>
                <p className="text-lg text-white mt-2 text-center">Possui conta? <Link to="/login" className="text-zinc-300 hover:text-white">Login</Link></p>
            </form>

        </div>
    )
}