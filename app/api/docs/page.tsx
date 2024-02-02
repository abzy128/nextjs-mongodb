import { getApiDocs } from "@/app/lib/swagger";
import ReactSwagger from "./react-swagger";
export default function Home() {
    return (
      <main className="">
        <ReactSwagger spec={getApiDocs()} />
      </main>
    );
  }
  