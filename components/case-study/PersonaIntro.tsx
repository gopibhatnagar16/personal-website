/* A persona name as a subheader, followed by the body paragraph. Opens a
   persona/composite section, e.g. "Meet Arjun". */
export function PersonaIntro({ name, body }: { name: string; body: string }) {
  return (
    <div className="cs-pi">
      <h3 className="cs-pi-name">{name}</h3>
      <p className="cs-pi-body">{body}</p>
    </div>
  );
}
