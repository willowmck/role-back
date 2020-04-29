import "dotenv/config";
import KcAdminClient from 'keycloak-admin';
export declare const kcAdminClient: KcAdminClient;
export declare const start: () => Promise<void>;
