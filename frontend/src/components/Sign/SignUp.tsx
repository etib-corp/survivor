import { Button, Label, TextInput } from "flowbite-react";

export function SignUp() {

    function handleSubmit(event: any) {
        event.preventDefault();
        const email = event.target.email2.value;
        const password = event.target.password2.value;
        const repeatPassword = event.target["repeat-password"].value;
        if (password !== repeatPassword) {
            alert("Passwords do not match");
        } else {
            alert(`Email: ${email}\nPassword: ${password}`);
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email2" value="Your email" />
                </div>
                <TextInput id="email2" type="email" placeholder="name@soulconnection.com" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password2" value="Your password" />
                </div>
                <TextInput id="password2" type="password" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="repeat-password" value="Repeat password" />
                </div>
                <TextInput id="repeat-password" type="password" required shadow />
            </div>
            <Button className="bg-blueT enabled:hover:bg-blue-500 focus:ring-1 focus:ring-gray-700" type="submit">Sign Up</Button>
        </form>
    );
}