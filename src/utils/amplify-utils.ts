import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import outputs from "@/../amplify_outputs.json";
import { cookies } from "next/headers";
import { getCurrentUser } from "@aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

const isAuthenticated = async () => {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        return !!user;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  });
};

export default isAuthenticated;
