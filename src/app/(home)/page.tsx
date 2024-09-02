import {auth} from "@/services/auth";
import {redirect} from "next/navigation";


export default async function App() {

    const session = await auth();

    return (
        <>
            {
                session?.user ? (
                    redirect('/home')
                ) : (
                    redirect('/singin')
                )
            }
        </>
    )
}