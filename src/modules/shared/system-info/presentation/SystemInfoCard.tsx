
import { SystemInfo } from "../domain/SystemInfo";
import { useSystemInfo } from "./useSystemInfo";

interface SystemInfoCardProps {
  container: {
    getInfo: () => Promise<SystemInfo>;
  };
}

export function SystemInfoCard({ container }: SystemInfoCardProps) {
  const { data, isLoading, error } = useSystemInfo({ container });

  if (isLoading) {
    return <div style={{ padding: "1rem" }}>Cargando info del sistema...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red", padding: "1rem" }}>
        Error al obtener información del sistema: {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem 0",
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Información del Sistema</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <strong>OS:</strong> {data.os_name}
        </li>
        <li>
          <strong>Versión OS:</strong> {data.os_version}
        </li>
        <li>
          <strong>Arquitectura:</strong> {data.architecture}
        </li>
        <li>
          <strong>Versión de App:</strong> {data.app_version}
        </li>
      </ul>
    </div>
  );
}
