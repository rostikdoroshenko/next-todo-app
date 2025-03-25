import { runWithAmplifyServerContext } from "@/utils/amplify-utils";
import { cookies } from "next/headers";
import { getCurrentUser } from "@aws-amplify/auth/server";

export async function getUserId() {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        return user.userId;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  });
}
