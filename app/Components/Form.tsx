import { FormInterface } from "../Utils/formInterface";

export function Form({ onSubmit, children }: Readonly<FormInterface>) {
  return <form onSubmit={onSubmit}> {children} </form>;
}
