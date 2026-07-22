/* Small eyebrow line + a spaced-out persona name + body paragraph.
   Opens a persona/composite section, e.g. "A composite from merchant
   calls / MEET ARJUN". */
export function PersonaIntro({
  eyebrow,
  name,
  body,
}: {
  eyebrow: string;
  name: string;
  body: string;
}) {
  return (
    <div className="cs-pi">
      <span className="cs-pi-eyebrow">{eyebrow}</span>
      <h3 className="cs-pi-name">{name}</h3>
      <p className="cs-pi-body">{body}</p>
    </div>
  );
}
