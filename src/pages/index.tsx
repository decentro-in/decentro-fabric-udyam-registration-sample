import ScreenLayout from "@/components/layouts/screenLayout";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";

export default function Home() {
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const { clientId, clientSecret } = useAuthStore();

  const form = useForm({
    initialValues: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    validate: {
      clientId: (value) => {
        if (value.length <= 0) {
          return "Client ID is required.";
        }
        return null;
      },
      clientSecret: (value) => {
        if (value.length <= 0) {
          return "Client Secret is required.";
        }
        return null;
      },
    },
    validateInputOnBlur: true,
  });

  useEffect(() => {
    console.log(clientId, clientSecret)
    if (clientId && clientSecret) {
      // redirect
    }
  }, [clientId, clientSecret]);

  const handleCredentialConfiguration = () => {
    if (!form.validate().hasErrors) {
      setAuthState(form.values.clientId, form.values.clientSecret);
      form.reset();
    }
  };

  return (
    <ScreenLayout title="Udyam Registration">
      <div className="w-full flex flex-col justify-around pt-10 md:pt-20">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-full max-w-sm">
            <form className="w-full max-w-sm">
              <TextInput
                required
                label="Client ID"
                placeholder="Client ID"
                {...form.getInputProps("clientId")}
                mb={16}
              />
              <TextInput
                required
                label="Client Secret"
                placeholder="Client Secret"
                {...form.getInputProps("clientSecret")}
                mb={16}
              />

              <Button
                onClick={handleCredentialConfiguration}
                type="button"
                fullWidth
              >
                Configure
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
