package main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.SimpleCommandLinePropertySource;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;

@CrossOrigin(originPatterns = "*")

@SpringBootApplication(exclude = ErrorMvcAutoConfiguration.class)
public class ResourcesApplication {
	public static final String SPRING_PROFILE_DEVELOPMENT = "dev";
	public static final String SPRING_PROFILE_PRODUCTION = "prod";
	public static final String SPRING_PROFILE_FAST = "fast";
	public static final String SPRING_PROFILE_CLOUD = "cloud";

	private static final Logger log = LoggerFactory.getLogger(ResourcesApplication.class);

	@Inject
	private Environment env;

	@PostConstruct
	public void initApplication() throws IOException {
		if (env.getActiveProfiles().length == 0) {
			log.warn("No Spring profile configured, running with default configuration");
		} else {
			log.info("Running with Spring profile(s) : {}", Arrays.toString(env.getActiveProfiles()));
			Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
			if (activeProfiles.contains(SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(SPRING_PROFILE_PRODUCTION)) {
				log.error("You have misconfigured your application! " + "It should not run with both the 'dev' and 'prod' profiles at the same time.");
			}
			if (activeProfiles.contains(SPRING_PROFILE_PRODUCTION) && activeProfiles.contains(SPRING_PROFILE_FAST)) {
				log.error("You have misconfigured your application! " + "It should not run with both the 'prod' and 'fast' profiles at the same time.");
			}
			if (activeProfiles.contains(SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(SPRING_PROFILE_CLOUD)) {
				log.error("You have misconfigured your application! " + "It should not run with both the 'dev' and 'cloud' profiles at the same time.");
			}
		}
	}

	public static void main(String[] args) throws UnknownHostException {
		SpringApplication app = new SpringApplication(ResourcesApplication.class);
		SimpleCommandLinePropertySource source = new SimpleCommandLinePropertySource(args);
		addDefaultProfile(app, source);
		Environment env = app.run(args).getEnvironment();
		log.info("Access URLs:\n----------------------------------------------------------\n\t" +
						"Local: \t\thttp://127.0.0.1:{}\n\t" +
						"External: \thttp://{}:{}\n----------------------------------------------------------",
				env.getProperty("server.port"),
				InetAddress.getLocalHost().getHostAddress(),
				env.getProperty("server.port"));

	}

	private static void addDefaultProfile(SpringApplication app, SimpleCommandLinePropertySource source) {
		if (!source.containsProperty("spring.profiles.active") &&
				!System.getenv().containsKey("SPRING_PROFILES_ACTIVE")) {

			app.setAdditionalProfiles(SPRING_PROFILE_DEVELOPMENT);
		}
	}
}