"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import axios from 'axios';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    username: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    dueDate: z.string(),
    priority: z.enum(["Low", "Medium", "High"]),
    status: z.enum(["To Do", "In Progress", "Completed"])
});

const Page = () => {

    const router = useRouter();

    const [name, setName] = useState("");
    const fetchData = async () => {
        try {
            const res = await axios.get("/api/users/myData");
            setName(res.data.cookieSavedData.username);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    fetchData();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            title: "",
            description: "",
            dueDate: "",
            priority: "Medium",
            status: "To Do"
        },
    });

    useEffect(() => {
        if (name) {
            form.reset({
                username: name, 
                title: "",
                description: "",
                dueDate: "",
                priority: "Medium",
                status: "To Do",
            });
        }
    }, [name, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            const response = await axios.post("/api/users/newTask", values);
            console.log("Task Created Successfully", response.data);
            router.push('/');
        } catch (error: any) {
            console.log("Error occured", error.message);
        }
    }

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-[90%] w-[80%] bg-zinc-700 rounded-xl flex flex-col justify-center items-center">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="text-gray-100">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the task title" {...field} className="bg-gray-700 text-gray-100 placeholder-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Due Date */}
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="text-gray-100">
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" placeholder="Select a due date" {...field} className="bg-gray-700 text-gray-100 placeholder-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="text-gray-100">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the task description" {...field} className="bg-gray-700 text-gray-100 placeholder-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Priority */}
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem className="text-gray-100">
                                        <FormLabel>Priority</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="High">High</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Low">Low</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Status */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="text-gray-100">
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="To Do">To Do</SelectItem>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Page;
