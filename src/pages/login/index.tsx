import { FormEvent, useState } from "react"
import { Link,useNavigate} from "react-router-dom"
import { Input } from "../../Components/input"
import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

 

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Preencha todos os Campos Corretamente!!")
            return;
        }
       
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Logado com Sucesso")
                navigate("/admin",{replace:true})
            })
            .catch((error) => {
                console.log("Error ao Fazer o Login" + error)
                if(error.code ==="auth/invalid-credential"){
                    alert("Credenciais inválidas. Por favor, verifique seu email e senha")
                }
            })
    }


    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
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

                <button
                    type="submit"
                    className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">
                    Acessar
                </button>
                <p className="text-lg text-white mt-2 text-center">Não possui conta? <Link to="/Cadastro" className="text-zinc-300 hover:text-white">Cadastre-se</Link></p>
            </form>

        </div>
    )
}