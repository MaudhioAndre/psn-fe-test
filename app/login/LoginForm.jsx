"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const { pending } = useFormStatus();

  return (
    <section className="flex justify-center items-center h-screen">
      <form action={loginAction} className="lg:min-w-1/3 min-w-3/4">
        <h1 className="text-center font-semibold text-2xl tracking-wide">LOGIN</h1>
        <div className="mt-4">
          <label className="font-semibold">Email</label>
          <input
            id="email"
            name="email"
            placeholder="Enter email..."
            class="w-full h-11 border rounded pl-2 mt-2"
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="font-semibold">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password..."
            class="w-full h-11 border rounded pl-2 mt-2"
          />
          {state?.errors?.password && (
            <p className="text-red-500">{state.errors.password}</p>
          )}
        </div>

        <button disabled={pending} className="w-full h-11 rounded border font-semibold mt-10 cursor-pointer" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}
