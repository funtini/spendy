import { useAuth, useUser } from '@clerk/clerk-expo';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAccounts } from '@/hooks/queries';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export default function DebugScreen() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { user } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  // Raw API probe
  const [probeResult, setProbeResult] = useState<string | null>(null);
  const [probeLoading, setProbeLoading] = useState(false);

  // Health check
  const [healthResult, setHealthResult] = useState<string | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);

  const accountsQuery = useAccounts();

  const handleGetToken = async () => {
    setTokenLoading(true);
    try {
      const t = await getToken();
      setToken(t);
      console.log('[DEBUG] Auth token:', t);
    } finally {
      setTokenLoading(false);
    }
  };

  const handleHealthCheck = async () => {
    setHealthLoading(true);
    setHealthResult(null);
    try {
      const base = API_URL.replace('/api', '');
      const res = await fetch(`${base}/health`);
      const body = await res.json().catch(() => ({}));
      setHealthResult(`${res.status} ${JSON.stringify(body)}`);
    } catch (e) {
      setHealthResult(`ERROR: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setHealthLoading(false);
    }
  };

  const handleProbeAccounts = async () => {
    setProbeLoading(true);
    setProbeResult(null);
    try {
      const t = await getToken();
      const res = await fetch(`${API_URL}/accounts`, {
        headers: {
          'Content-Type': 'application/json',
          ...(t ? { Authorization: `Bearer ${t}` } : {}),
        },
      });
      const body = await res.text();
      setProbeResult(`${res.status}\n${body}`);
    } catch (e) {
      setProbeResult(`NETWORK ERROR: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setProbeLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>🐛 DEBUG</Text>

        {/* Auth State */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AUTH STATE</Text>
          <Row label="isLoaded" value={String(isLoaded)} highlight={isLoaded} />
          <Row label="isSignedIn" value={String(isSignedIn)} highlight={!!isSignedIn} />
          {user && (
            <>
              <Row label="userId" value={user.id} mono />
              <Row label="email" value={user.primaryEmailAddress?.emailAddress ?? '—'} />
              <Row label="firstName" value={user.firstName ?? '—'} />
            </>
          )}
        </View>

        {/* Accounts Query State */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ACCOUNTS QUERY</Text>
          <Row label="isPending" value={String(accountsQuery.isPending)} />
          <Row label="isFetching" value={String(accountsQuery.isFetching)} />
          <Row label="isSuccess" value={String(accountsQuery.isSuccess)} highlight={accountsQuery.isSuccess} />
          <Row label="isError" value={String(accountsQuery.isError)} />
          {accountsQuery.isError && (
            <Text style={styles.errorText}>
              {accountsQuery.error instanceof Error
                ? accountsQuery.error.message
                : String(accountsQuery.error)}
            </Text>
          )}
          {accountsQuery.isSuccess && (
            <Row label="count" value={String(accountsQuery.data?.data?.length ?? 0)} highlight />
          )}
        </View>

        {/* Backend health + raw probe */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>BACKEND</Text>
          <Row label="API URL" value={API_URL} mono />

          <TouchableOpacity
            style={[styles.button, healthLoading && styles.buttonDisabled]}
            onPress={handleHealthCheck}
            disabled={healthLoading}
          >
            <Text style={styles.buttonText}>{healthLoading ? 'Checking…' : 'Health check /health'}</Text>
          </TouchableOpacity>
          {healthResult !== null && (
            <Text style={[styles.tokenText, healthResult.startsWith('ERROR') && { color: '#FF6B6B' }]}>
              {healthResult}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.button, probeLoading && styles.buttonDisabled]}
            onPress={handleProbeAccounts}
            disabled={probeLoading}
          >
            <Text style={styles.buttonText}>{probeLoading ? 'Fetching…' : 'Raw GET /accounts'}</Text>
          </TouchableOpacity>
          {probeResult !== null && (
            <Text style={[styles.tokenText, probeResult.startsWith('4') || probeResult.startsWith('5') || probeResult.startsWith('N') || probeResult.startsWith('E') ? { color: '#FF6B6B' } : { color: '#4DFFA0' }]}>
              {probeResult}
            </Text>
          )}
        </View>

        {/* Token */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>JWT TOKEN</Text>
          <TouchableOpacity
            style={[styles.button, tokenLoading && styles.buttonDisabled]}
            onPress={handleGetToken}
            disabled={tokenLoading}
          >
            <Text style={styles.buttonText}>
              {tokenLoading ? 'Fetching…' : 'Get Token → console.log'}
            </Text>
          </TouchableOpacity>
          {token !== null && (
            <>
              <Text style={styles.tokenText} numberOfLines={4} ellipsizeMode="middle">
                {token}
              </Text>
              <TouchableOpacity style={styles.clearButton} onPress={() => setToken(null)}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Config */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>CONFIG</Text>
          <Row label="API URL" value={process.env.EXPO_PUBLIC_API_URL ?? '—'} mono />
          <Row label="Clerk key" value={(process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '—').slice(0, 24) + '…'} mono />
          <Row label="__DEV__" value={String(__DEV__)} highlight />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface RowProps {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}

const Row: React.FC<RowProps> = ({ label, value, highlight, mono }) => (
  <View style={rowStyles.row}>
    <Text style={rowStyles.label}>{label}</Text>
    <Text style={[rowStyles.value, mono && rowStyles.mono, highlight && rowStyles.highlight]}>
      {value}
    </Text>
  </View>
);

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  label: {
    fontSize: 12,
    color: '#8896B3',
    flex: 1,
  },
  value: {
    fontSize: 12,
    color: '#EEF2FF',
    flex: 2,
    textAlign: 'right',
  },
  mono: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 11,
  },
  highlight: {
    color: '#4DFFA0',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080C16',
  },
  container: {
    padding: 16,
    paddingBottom: 120,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EEF2FF',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#0F1522',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 2,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4A5A7A',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#1C2538',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4DFFA0',
  },
  tokenText: {
    fontSize: 10,
    fontFamily: 'JetBrainsMono_400Regular',
    color: '#8896B3',
    lineHeight: 16,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 11,
    color: '#FF6B6B',
    marginTop: 4,
    lineHeight: 16,
  },
  clearButton: {
    alignSelf: 'flex-end',
  },
  clearButtonText: {
    fontSize: 11,
    color: '#FF6B6B',
  },
});
