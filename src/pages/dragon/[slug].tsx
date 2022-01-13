import { useRouter } from "next/router";
import { IoMdBackspace } from "react-icons/io";

import { Dragon, getDragon } from "@/services/hooks/useDragons";
import { withSSRAuth } from "@/utils/withSSRAuth";

import Button from "@/components/elements/Button";
import { Loading } from "@/components/widgets/LoadingState";

import { ParsedUrlQuery } from "querystring";

import Container from "./styles";

interface DragonPageProps {
  dragon: Dragon;
}

export default function DragonPage({ dragon }: DragonPageProps) {
  const router = useRouter();

  function handleClickBack() {
    router.replace("/dashboard");
  }

  return (
    <Container>
      <Button onClick={handleClickBack}>
        <IoMdBackspace />
        Voltar
      </Button>

      <h1>{dragon.name}</h1>
      <h2>Tipo: {dragon.type}</h2>
      <span>Criado em: {dragon.createdAt}</span>
    </Container>
  );
}

export const getServerSideProps = withSSRAuth(async ({ params }) => {
  const { slug } = params as ParsedUrlQuery;

  const dragon = await getDragon(String(slug));

  if (dragon) {
    return {
      props: {
        dragon: {
          ...dragon,
          createdAt: new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }).format(new Date(dragon.createdAt)),
        },
      },
    };
  }

  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };
});
