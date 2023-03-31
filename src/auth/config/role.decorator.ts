import { SetMetadata } from "@nestjs/common";
import { RoleType } from "../role-types";

export const Roles = (...roles: RoleType[]): any=> SetMetadata("roles", roles);