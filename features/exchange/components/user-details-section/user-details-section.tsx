"use client"

import { useUserDetailsStore } from "../../hooks/use-user-details";
import { UserInfo } from "../user-info/user-info";
import { Observations } from "../observations/observations";

function UserDetailsSection() {
  const {
    userDetails,
    isVisible,
    setUserDetails
  } = useUserDetailsStore();

  const handleSituacaoChange = (value: string) => {
    setUserDetails({ situacaoReceita: value });
  };

  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      <UserInfo
        nome={userDetails.nome}
        classificacao={userDetails.classificacao}
        usuarioUltimaAtualizacao={userDetails.usuarioUltimaAtualizacao}
        dataUltimaAtualizacao={userDetails.dataUltimaAtualizacao}
        diferencial={userDetails.diferencial}
      />

      <Observations
        situacaoReceita={userDetails.situacaoReceita}
        onSituacaoChange={handleSituacaoChange}
      />
    </div>
  );
}

export { UserDetailsSection };