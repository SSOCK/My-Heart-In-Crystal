'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { use3DModel } from '@/app/(protected)/make/store/modelStore';
import { BOTTOM, MAIN_DECORATION } from '@/shared/constants/3dModel';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';
import { BACKEND_ROUTES, ROUTES } from '@/shared/constants/routes';
import { User } from '@/shared/types/user';

const formSchema = z.object({
  title: z.string().min(1).max(10),
});

const TitleForm = () => {
  const router = useRouter();
  const { update, data: session } = useSession();
  const {
    setTitle,
    title,
    model,
    bottom,
    modelColor,
    bottomColor,
    resetModel,
  } = use3DModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async () => {
    const modelArray = Object.values(MAIN_DECORATION);
    const modelId = modelArray.filter((item) => {
      return item.path === model;
    })[0].id;
    const bottomArray = Object.values(BOTTOM);
    const bottomId = bottomArray.filter((item) => {
      return item.path === bottom;
    })[0].id;

    const user = session?.user as User;
    const data = {
      user_id: user._id,
      title: title,
      model: modelId,
      modelColor,
      bottom: bottomId,
      bottomColor,
      message_id: [],
    };

    try {
      const response = await clientComponentFetch(BACKEND_ROUTES.CRYSTAL, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        update({ ...session?.user, crystal_id: response.crystal_id });
        resetModel();
        router.replace(ROUTES.MAIN);
        sessionStorage.setItem('isDecorated', 'true');
        sessionStorage.setItem('toast', 'true');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <div />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pointer-events-auto space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="수정구슬 이름을 입력해주세요."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 10) {
                      return;
                    }

                    setTitle({ title: value });
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          variant={'outline'}
          type="submit"
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TitleForm;
