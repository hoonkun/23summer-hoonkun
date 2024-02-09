import React, { PropsWithChildren, useMemo } from "react"

export const Highlighted: React.FC<{ children: string, highlight: RegExp | string, highlighter: React.FC<PropsWithChildren>, className?: string, caseSensitive?: boolean }> = props => {
  if (props.highlight instanceof RegExp)
    return <HighlightedRegex {...props} regex={props.highlight}>{props.children}</HighlightedRegex>
  else
    return <HighlightedText {...props} text={props.highlight}>{props.children}</HighlightedText>
}

export const HighlightedRegex: React.FC<{ children: string, regex: RegExp, highlighter: React.FC<PropsWithChildren>, className?: string }> = ({ children, regex, highlighter, className }) => {
  const segments = useMemo(() => children.split(regex), [children, regex]);
  const matches = useMemo(() => Array.from(children.matchAll(regex)), [children, regex]);

  const array = useMemo(() => {
    const results: { highlight: boolean, text: string }[] = []
    let matcherIndex = 0
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]

      const previous = results.findLast(it => it.highlight)
      if (previous?.text !== segment) {
        results.push({ highlight: false, text: segment })
      } else {
        continue
      }

      const match = matches[matcherIndex++]
      if (match) results.push({ highlight: true, text: match["0"] })
    }
    return results
  }, [segments, matches]);

  const Highlighted = highlighter

  return (
    <span className={className}>
      {array.map((it, index) =>
        !it.highlight ?
          <React.Fragment key={`ht_${index}`}>{it.text}</React.Fragment> :
          <Highlighted key={`ht_${index}`}>{it.text}</Highlighted>
      )}
    </span>
  )
}

const HighlightedText: React.FC<{ children: string, text: string, highlighter: React.FC<PropsWithChildren>, className?: string, caseSensitive?: boolean }> = ({ children, text, highlighter, className, caseSensitive }) => {
  const _highlight = useMemo(() => (text.length ? [text] : []).let(it => it.length ? it : [text]), [text]);
  const segments = useMemo(() => {
    if (_highlight.length === 0) return [{ text: children, highlight: false }];

    const regex = _highlight.map(it => it.replace(/([+\\/.*(){}\[\]?^$|=])/g, "\\$1")).join("|");
    const matched = children.match(new RegExp(regex, caseSensitive ? "gu" : "gui"));

    if (!matched) return [{ text: children, highlight: false }];

    const split = children.split(new RegExp(regex, "gui"));
    const result: { highlight: boolean, text: string }[] = [];
    let index = 0;
    for (const segment of split) {
      result.push({ highlight: false, text: segment });
      result.push({ highlight: true, text: matched[index] });
      index++;
    }
    return result;
  }, [children, _highlight]);

  const Highlighted = highlighter

  return (
    <span className={className}>
      {segments.map((it, index) =>
        !it.highlight ?
          <React.Fragment key={`ht_${index}`}>{it.text}</React.Fragment> :
          <Highlighted key={`ht_${index}`}>{it.text}</Highlighted>
      )}
    </span>
  );
};
