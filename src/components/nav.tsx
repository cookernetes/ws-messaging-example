"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Nav({ currentUserId }: { currentUserId: string | undefined }) {
  const segments = useSelectedLayoutSegments();
  const segmentsLength = segments.length;
  const isHome = segmentsLength === 0;
  const activeSegment = segments.slice(-1)[0];

  return (
    <Breadcrumb className={"mb-4"}>
      <BreadcrumbList>
        {segmentsLength === 0 ? (
          <BreadcrumbPage>Home</BreadcrumbPage>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className={"capitalize"}>
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {segments.map((segment, idx) =>
          idx !== segmentsLength - 1 ? (
            <Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${segments.slice(0, idx + 1).join("/")}`} className={"capitalize"}>
                    {segment}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ) : (
            <BreadcrumbItem key={idx}>
              <BreadcrumbPage className={"capitalize"}>{segment}</BreadcrumbPage>
            </BreadcrumbItem>
          ),
        )}
      </BreadcrumbList>

      <span>
        <h1 className={"capitalize"}>
          WS Messaging Prototype{" "}
          {!isHome &&
            `- ${Number.isNaN(parseInt(activeSegment)) ? activeSegment : `Channel ${activeSegment}`}`}
        </h1>
        {currentUserId && <pre>Logged in with ID: {currentUserId}</pre>}
      </span>
    </Breadcrumb>
  );
}
