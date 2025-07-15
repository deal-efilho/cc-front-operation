import type { MenuConfig } from "@mfe/cc-front-shared";

type SubMenu = {
  name: string;
  href: string;
  permissionKeys?: string[];
};

type Menu = {
  name: string;
  subMenus: SubMenu[];
  permissionKeys?: string[];
};

export const MENU_CONFIG: MenuConfig & {
  operation: Menu[];
} = {
  westernUnion: [
    {
      name: "Western Union",
      subMenus: [
        {
          name: "Enviar Remessa",
          href: "/wu/send",
          permissionKeys: [
            "hasPermissionSendRemittance"
          ],
        },
        {
          name: "Receber Remessa",
          href: "/wu/receive",
          permissionKeys: [
            "hasPermissionReceiveRemittance"
          ],
        },
        {
          name: "Consultar Operações",
          href: "/wu/consult",
          permissionKeys: [
            "hasPermissionConsultRemittances",
            "hasPermissionConsultRemittancesByOperator",
          ],
        },
      ],
      permissionKeys: [
        "hasPermissionSendRemittance",
        "hasPermissionReceiveRemittance",
        "hasPermissionConsultRemittances",
        "hasPermissionConsultRemittancesByOperator",
      ],
    },
  ],
  contaGlobal: [
    {
      name: "Conta Global",
      subMenus: [
        {
          name: "Consultar Transações",
          href: "/ci/consult",
          permissionKeys: ["hasPermissionContaGlobalMenu"],
        },
        {
          name: "Consultar Cartões",
          href: "/ci/cards",
          permissionKeys: ["hasPermissionContaGlobalMenu"],
        },
      ],
      permissionKeys: ["hasPermissionContaGlobalMenu"],
    },
  ],
  operation: [
    {
      name: "Operações",
      subMenus: [
        {
          name: "Negociar Câmbio Express",
          href: "/op/express",
          permissionKeys: ["hasPermissionSendRemittance"],
        },
        {
          name: "Negociar Câmbio",
          href: "/op/exchange",
          permissionKeys: ["hasPermissionSendRemittance"],
        },
        {
          name: "Consultar Propostas",
          href: "/op/consult",
          permissionKeys: ["hasPermissionSendRemittance"],
        }
      ]
    }
  ]
};