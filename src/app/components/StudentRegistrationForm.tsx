import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { CheckCircle2 } from 'lucide-react';

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  grade: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  emergencyContact: string;
}

export function StudentRegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<StudentFormData | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<StudentFormData>();

  const onSubmit = (data: StudentFormData) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const handleNewRegistration = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="size-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Registration Successful!</CardTitle>
            <CardDescription>
              Thank you for registering. We have received your information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-lg">Registration Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Student Name:</span>
                  <p className="font-medium">{submittedData.firstName} {submittedData.lastName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{submittedData.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Grade:</span>
                  <p className="font-medium">{submittedData.grade}</p>
                </div>
                <div>
                  <span className="text-gray-600">Date of Birth:</span>
                  <p className="font-medium">{submittedData.dateOfBirth}</p>
                </div>
                <div>
                  <span className="text-gray-600">Parent/Guardian:</span>
                  <p className="font-medium">{submittedData.parentName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Parent Email:</span>
                  <p className="font-medium">{submittedData.parentEmail}</p>
                </div>
              </div>
            </div>
            <Button onClick={handleNewRegistration} className="w-full">
              Register Another Student
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl my-8">
        <CardHeader>
          <CardTitle className="text-3xl">Student Registration Form</CardTitle>
          <CardDescription>
            Please fill out all required fields to complete the registration process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Student Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Student Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="student@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth', { required: 'Date of birth is required' })}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('gender', value)}
                    value={watch('gender')}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register('gender', { required: 'Gender is required' })} />
                  {errors.gender && (
                    <p className="text-sm text-red-500">{errors.gender.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">
                    Grade <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('grade', value)}
                    value={watch('grade')}
                  >
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kindergarten">Kindergarten</SelectItem>
                      <SelectItem value="grade-1">Grade 1</SelectItem>
                      <SelectItem value="grade-2">Grade 2</SelectItem>
                      <SelectItem value="grade-3">Grade 3</SelectItem>
                      <SelectItem value="grade-4">Grade 4</SelectItem>
                      <SelectItem value="grade-5">Grade 5</SelectItem>
                      <SelectItem value="grade-6">Grade 6</SelectItem>
                      <SelectItem value="grade-7">Grade 7</SelectItem>
                      <SelectItem value="grade-8">Grade 8</SelectItem>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register('grade', { required: 'Grade is required' })} />
                  {errors.grade && (
                    <p className="text-sm text-red-500">{errors.grade.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Address</h3>
              
              <div className="space-y-2">
                <Label htmlFor="address">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  {...register('address', { required: 'Address is required' })}
                  placeholder="Enter street address"
                  rows={2}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    {...register('city', { required: 'City is required' })}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    {...register('state', { required: 'State is required' })}
                    placeholder="Enter state"
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500">{errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">
                    ZIP Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    {...register('zipCode', { required: 'ZIP code is required' })}
                    placeholder="Enter ZIP code"
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-red-500">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Parent/Guardian Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">
                    Parent/Guardian Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="parentName"
                    {...register('parentName', { required: 'Parent/Guardian name is required' })}
                    placeholder="Enter parent/guardian name"
                  />
                  {errors.parentName && (
                    <p className="text-sm text-red-500">{errors.parentName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentEmail">
                    Parent/Guardian Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    {...register('parentEmail', {
                      required: 'Parent/Guardian email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="parent@example.com"
                  />
                  {errors.parentEmail && (
                    <p className="text-sm text-red-500">{errors.parentEmail.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentPhone">
                    Parent/Guardian Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    {...register('parentPhone', { required: 'Parent/Guardian phone is required' })}
                    placeholder="(123) 456-7890"
                  />
                  {errors.parentPhone && (
                    <p className="text-sm text-red-500">{errors.parentPhone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">
                    Emergency Contact <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    {...register('emergencyContact', { required: 'Emergency contact is required' })}
                    placeholder="(123) 456-7890"
                  />
                  {errors.emergencyContact && (
                    <p className="text-sm text-red-500">{errors.emergencyContact.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Submit Registration
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
