"use client";

import React from "react";
import Image from "next/image";
import main from "../../../public/Login/main.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters").max(50, "Username must be 50 characters or less"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

const ProfileForm = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
        try {
            const response = await axios.post("/api/users/signup", values);
            console.log("Signup Success", response.data);
            router.push('/login');
        } catch (error) {
            console.log("Signup Failed", error);
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-gray-900 text-gray-100">
            <div className="h-[90%] w-[80%] flex bg-gray-800 rounded-lg shadow-lg">
                {/* IMAGE */}
                <div className="h-full w-[40%] border-r border-gray-700">
                    <Image src={main} alt="Failed to load the image" className="object-cover h-full w-full" />
                </div>

                {/* FORM */}
                <div className="h-full w-[60%] flex flex-col justify-center items-center p-8">
                    <p className="text-4xl font-bold p-8 mb-[5%]">Register Now</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="text-gray-100">
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your username" {...field} className="bg-gray-700 text-gray-100 placeholder-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="text-gray-100">
                                        <FormLabel>Email id</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter your email" {...field} className="bg-gray-700 text-gray-100 placeholder-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="text-gray-100">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Generate Password" {...field} className="bg-gray-700 text-gray-100 placeholder-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Signup</Button>
                            <p>Already have an account - <Link href="/login" className="text-blue-400 hover:underline">login</Link></p>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
