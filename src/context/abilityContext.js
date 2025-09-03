import { createContext } from "react";
import { Ability, AbilityBuilder } from "@casl/ability";

export const AbilityContext = createContext();

export function defineAbilitiesFor(privileges = []) {
  const { can, build } = new AbilityBuilder(Ability);

  const privilegeMap = {
    view_files: () => can("view", "Files"),
    view_sales: () => can("view", "Sales"),
    view_reports: () => can("view", "Reports"),
    view_messages: () => can("view", "Messages"),
    edit_messages: () => can("edit", "Messages"),
    edit_reports: () => can("edit", "Reports"),
    full_control: () => can("manage", "all"),
    full_view: () => can("view", "all"),
    manage_categories: () => can("manage", "Categories"),
  };

  privileges.forEach((priv) => {
    const applyRule = privilegeMap[priv];
    if (applyRule) applyRule();
  });

  return build();
}
