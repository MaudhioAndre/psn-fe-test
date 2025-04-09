"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

import { Toast } from "primereact/toast";
import { useRef } from "react";
import { redirect } from "next/navigation";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const { pending } = useFormStatus();

  const runToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const toast = useRef(null);

  useEffect(() => {
    if(state?.success){
      runToast("success", "Login Success", "You will be redirected to dashboard"); 
      setTimeout(() => {
        redirect("/dashboard");  
      }, 1000);
    };
    
  }, [state]);

  return (
    <section className="flex justify-center items-center h-screen">
      <form action={loginAction} className="lg:min-w-1/3 min-w-3/4">
        <h1 className="text-center font-semibold text-2xl tracking-wide">
          LOGIN
        </h1>
        <div className="mt-4">
          <label className="font-semibold text-lg">Email</label>
          <input
            id="email"
            name="email"
            placeholder="Enter email..."
            className="w-full h-11 border rounded pl-2 mt-2 border-black"
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="font-semibold text-lg">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password..."
            className="w-full h-11 border rounded pl-2 mt-2 border-black"
          />
          {state?.errors?.password && (
            <p className="text-red-500">{state.errors.password}</p>
          )}
        </div>
        <br />
        <button
          disabled={pending}
          className="w-full h-11 bg-black hover:bg-red text-white rounded border font-semibold mt-6 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
      <Toast ref={toast} />
    </section>
  );
}
