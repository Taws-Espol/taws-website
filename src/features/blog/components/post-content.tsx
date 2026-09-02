import {
  type JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";

import { Heading, Text } from "@/shared/components/ui/typography";

/**
 * Rich text renders through the site's own typography rather than bare tags, so
 * a heading written in the CMS matches a heading written in a component.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => (
    <Text className="text-foreground/80">
      {nodesToJSX({ nodes: node.children })}
    </Text>
  ),
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const level = Number(node.tag.replace("h", ""));

    return (
      <Heading
        as={node.tag as "h2"}
        className={level <= 2 ? "mt-6 text-2xl" : "mt-4 text-xl"}
      >
        {children}
      </Heading>
    );
  },
  quote: ({ node, nodesToJSX }) => (
    <blockquote className="border-border text-muted-foreground border-l-2 pl-4 italic">
      {nodesToJSX({ nodes: node.children })}
    </blockquote>
  ),
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const className = "flex list-outside flex-col gap-2 pl-6";

    return node.tag === "ol" ? (
      <ol className={`${className} list-decimal`}>{children}</ol>
    ) : (
      <ul className={`${className} list-disc`}>{children}</ul>
    );
  },
});

export function PostContent({ content }: { content: unknown }) {
  return (
    <div className="flex flex-col gap-4">
      <RichText
        data={content as never}
        converters={converters}
        disableContainer
      />
    </div>
  );
}
