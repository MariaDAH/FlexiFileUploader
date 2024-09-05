"use client"

import { Button } from "@/components/ui/button/button"
import { Textbox } from "@/components/ui/textbox/textbox"
import router from "next/router";
import { FormEvent } from "react";

/*async function registerUserAction (formData: FormData) {

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    await fetch(`/api/public/v1/signup`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password
        }),
    }).then(res => {
        console.log('The user has been created and response returned to sigup page');
        router.push('/')
    }).catch(err => {
        console.log('There was ane error signing up',err)
    })
}*/

async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);

        const response = await fetch(`/api/public/v1/signup`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                form: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        });

        if (!!response.ok) {
            console.error(response.statusText);
            //setError(response.error.message);
        } else {
            router.push("/");
        }
    } catch (e) {
        console.error(e);
        //setError("Check your Credentials");
    }
}

export default function signup() {

    return (
            <>
                <main className="dark:bg-black dark:text-white w-screen h-screen flex items-center justify-center">
                    <div className="dark:bg-black dark:text-white w-1/2 h-1/2 flex items-center justify-center">
                        <form
                            onSubmit={onSubmit}
                            className="my-5 flex flex-col items-rigth border p-3 border-gray-200 rounded-md flex bg-emerald-700">
                            <div className="my-2 flex justify-end">
                                <label htmlFor="email" className="text-gray-200 m-2">Name</label>
                                <Textbox type="text" name="name" id="id" required></Textbox>
                            </div>
                            <div className="my-2 flex justify-end">
                                <label htmlFor="email" className="text-gray-200 m-2">Email</label>
                                <Textbox type="email" name="email" id="email" required></Textbox>
                            </div>

                            <div className="my-2 flex justify-end">
                                <label htmlFor="password" className="text-gray-200 m-2">Password</label>
                                <Textbox type="password" name="password" id="password" required></Textbox>
                            </div>
                            <div className="flex justify-center">
                                <Button type="submit" size="large" label="SignUp"></Button>
                            </div>
                        </form>
                    </div>
                </main>
            </>
        )
    }