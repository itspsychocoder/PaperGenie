
"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import { NewAssessmentForm } from "@/components/new-assessment-form";
import { InnerAssessmentForm } from "@/components/inner-assessment-form copy";

export default function Page() {
  const [showInnerForm, setShowInnerForm] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);

  const handleNewAssessmentSubmit = (formData) => {
    setInitialFormData(formData);
    setShowInnerForm(true);
  };

  const handleBack = () => {
    setShowInnerForm(false);
    setInitialFormData(null);
  };

  return (
    (<SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center flex-col gap-4 py-4 md:gap-6 md:py-6">
              {!showInnerForm ? (
                <NewAssessmentForm onSubmit={handleNewAssessmentSubmit} />
              ) : (
                <InnerAssessmentForm 
                  initialData={initialFormData}
                  onBack={handleBack}
                />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
