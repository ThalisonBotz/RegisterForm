import './global.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemeProvider } from '@/components/theme-provider';
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-2" variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  email: z.string().email(),
  dateOfBirth: z.object({
    month: z.string().optional(),
    day: z.string().optional(),
    year: z.string().optional()
  })
});

type FormData = z.infer<typeof schema>;

function App() {
  const { handleSubmit, register, setValue, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  useEffect(() => {
    register('dateOfBirth.month');
    register('dateOfBirth.day');
    register('dateOfBirth.year');
  }, [register]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='h-screen w-full flex items-center justify-center bg-background p-4'>
        <div className='max-w-2xl w-full bg-card shadow rounded p-8 border-2'>
        <ModeToggle />
          <h1 className='m-auto text-2xl font-bold text-center'>Registration</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <Label>First Name</Label>
                <Input placeholder="Joe" className='border-2' type="text" {...register('firstName')} />
                {formState.errors.firstName?.message && <span className='text-red-500 text-xs'>Input Error</span>}
              </div>
              <div>
                <Label>Last Name</Label>
                <Input placeholder="Doe" className='border-2' type="text" {...register('lastName')} />
                {formState.errors.lastName?.message && <span className='text-red-500 text-xs'>Input Error</span>}
              </div>
            </div>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <Label>E-mail</Label>
                <Input placeholder="JoeDoe@test.com" className='border-2' type="email" {...register('email')} />
                {formState.errors.email?.message && <span className='text-red-500 text-xs'>Input Error</span>}
              </div>
              <div>
                <Label>Company</Label>
                <Input placeholder="Google" className='border-2' type="text" {...register('company')} />
                {formState.errors.company?.message && <span className='text-red-500 text-xs'>Input Error</span>}
              </div>
            </div>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-end'>
              <div>
                <Label>Date of birth</Label>
                <Select onValueChange={(value) => setValue('dateOfBirth.month', value)}>
                  <SelectTrigger className="border-2 w-full">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array(12).fill(1).map((_, index) => { 
                      const value = String(index + 1).padStart(2, '0');
                      return (
                        <SelectItem key={index} value={value}>{value}</SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {formState.errors.dateOfBirth?.month?.message && <span className='text-red-500 text-xs'>Input Error</span>}
              </div>
              <div>
                <Select onValueChange={(value) => setValue('dateOfBirth.day', value)}>
                  <SelectTrigger className="border-2 w-full">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array(31).fill(1).map((_, index) => { 
                      const value = String(index + 1).padStart(2, '0');
                      return (
                        <SelectItem key={index} value={value}>{value}</SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {formState.errors.dateOfBirth?.day?.message && <span className='text-red-500 text-xs'>Input Error</span>}
              </div>
              <div>
                <Select onValueChange={(value) => setValue('dateOfBirth.year', value)}>
                  <SelectTrigger className="border-2 w-full">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array(124).fill(1).map((_, index) => { 
                      const value = String(index + 1901).padStart(4, '0');
                      return (
                        <SelectItem key={index} value={value}>{value}</SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {formState.errors.dateOfBirth?.year?.message && <span className='text-red-500 text-xs'>Input Error</span>}
              </div>
            </div>
            <Button className="mt-6 w-full" type="submit">Register</Button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
