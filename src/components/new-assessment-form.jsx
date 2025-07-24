import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export function NewAssessmentForm({
    className,
    ...props
}) {
    return (
        <div className={cn("w-[50vw] flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>New Assessment</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">

                                    <Label htmlFor="subject">Subject</Label>
                                    <Select>
                                        <SelectTrigger className="w-[100%]">
                                            <SelectValue placeholder="Select a Subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select Subject</SelectLabel>
                                                <SelectItem value="cs">Computer Science</SelectItem>
                                                <SelectItem value="physics">Physics</SelectItem>
                                                <SelectItem value="chemistry">Chemistry</SelectItem>
                                                <SelectItem value="df">Differential Equations</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                               
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="subject">Assessment Type</Label>
                                    <Select>
                                        <SelectTrigger className="w-[100%]">
                                            <SelectValue placeholder="Select Assessment" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select Assessment Type</SelectLabel>
                                                <SelectItem value="fullPaper">Full Paper</SelectItem>
                                                <SelectItem value="mcqs">Mcqs</SelectItem>
                                                <SelectItem value="shortQuestions">Short Questions</SelectItem>
                                                <SelectItem value="longQuestions">Long Questions</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                             
                                
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
