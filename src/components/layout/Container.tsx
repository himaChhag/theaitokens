export default function Container({ children }: { children: React.ReactNode }) {
    return (
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px" }}>
        {children}
      </div>
    );
  }