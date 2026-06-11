'use client';

import { useMemo } from 'react';
import countryList from 'react-select-country-list';
import { Label } from '@/components/ui/label';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command';

import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const CountrySelectField = ({
   name,
   label,
   control,
   error,
   required = false,
}: CountrySelectProps) => {
   const countries = useMemo(
      () => countryList().getData(),
      []
   );

   const [open, setOpen] = useState(false);

   return (
      <div className="space-y-2">
         <Label htmlFor={name} className="form-label">
            {label}
         </Label>

         <Controller
            name={name}
            control={control}
            rules={{ required: required ? `Please select a ${label.toLowerCase()}` : false }}
            render={({ field }) => {
               const selected = countries.find(
                  (c) => c.value === field.value
               );

               return (
                  <Popover open={open} onOpenChange={setOpen}>
                     <PopoverTrigger asChild>
                        <Button
                           variant="outline"
                           className="w-full justify-between form-input"
                        >
                           {selected ? (
                              <div className="flex items-center gap-2">
                                 <img
                                    src={`https://flagcdn.com/24x18/${selected.value.toLowerCase()}.png`}
                                    alt=""
                                    className="w-5 rounded-sm"
                                 />
                                 {selected.label}
                              </div>
                           ) : (
                              'Select country'
                           )}
                           <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                     </PopoverTrigger>

                     <PopoverContent
                        className="w-[350px] p-0"
                        align="start"
                     >
                        <Command>
                           <CommandInput placeholder="Search country..." />
                           <CommandList>
                              <CommandEmpty>No country found</CommandEmpty>
                              <CommandGroup>
                                 {countries.map((country) => (
                                    <CommandItem
                                       key={country.value}
                                       value={country.label}
                                       onSelect={() => {
                                          field.onChange(country.value);
                                          setOpen(false);
                                       }}
                                    >
                                       <div className="flex items-center gap-2">
                                          <img
                                             src={`https://flagcdn.com/24x18/${country.value.toLowerCase()}.png`}
                                             alt=""
                                             className="w-5 rounded-sm"
                                          />
                                          {country.label}
                                       </div>
                                       <Check
                                          className={cn(
                                             'ml-auto',
                                             field.value === country.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                          )}
                                       />
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                           </CommandList>
                        </Command>
                     </PopoverContent>
                  </Popover>
               );
            }}
         />
         {error && <p className='text-red-500 text-sm'>{error.message}</p>}
      </div>
   );
};

export default CountrySelectField;