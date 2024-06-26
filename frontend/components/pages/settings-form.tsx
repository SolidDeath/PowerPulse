'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    formInputProps,
    group1FormInputs,
    group2FormInputs,
    group3FormInputs,
    group4FormInputs,
    group5FormInputs,
} from '@/config';
import { useState } from 'react';

const generateFormSchema = (inputs: formInputProps[]) => {
    const schema: { [key: string]: z.ZodString } = {};
    inputs.forEach((input) => {
        schema[input.inputName] = z.string().min(1, {
            message: `${input.inputLabel} is required`,
        });
    });
    return z.object(schema);
};

export default function SettingsForm() {
    const allFormInputs = [
        ...group1FormInputs,
        ...group2FormInputs,
        ...group3FormInputs,
        ...group4FormInputs,
        ...group5FormInputs,
    ];

    const formSchema = generateFormSchema(allFormInputs);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: allFormInputs.reduce(
            (acc, input) => ({ ...acc, [input.inputName]: '' }),
            {},
        ),
    });

    const [buttonTitle, setButtonTitle] = useState('Submit');

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault();
        setButtonTitle(
            'This button does not actually do anything :).',
        );
        setTimeout(() => {
            setButtonTitle('Submit');
        }, 3000);
    };

    return (
        <Form {...form}>
            {/* <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 py-8 sm:w-[24rem]"> */}
            <form className="w-full space-y-4 py-8 grid grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
                {allFormInputs.map((item, index) => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={item.inputName}
                        render={({ field }) => (
                            <FormItem className=" h-full align-bottom justify-end ">
                                <FormLabel>
                                    {item.inputLabel}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            item.inputPlaceholder
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button
                    className="w-full md:col-span-3"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick(e);
                    }}>
                    {buttonTitle}
                </Button>
            </form>
        </Form>
    );
}
